import { FC, useState } from 'react'
import { Tabs } from 'nextra/components'

interface ConfigOption {
  id: string
  label: string
  value: string
}

interface ConfigOptions {
  environment: ConfigOption[]
  processor: ConfigOption[]
  moondreamModel: ConfigOption[]
  quantization: ConfigOption[]
}

interface SelectedConfig {
  environment: string | null
  processor: string | null
  moondreamModel: string | null
  quantization: string | null
}

interface ScriptVariables {
  modelUrl: string
  libraryInstall: string
  modelPath: string
  fileSize: string
}

const configOptions: ConfigOptions = {
  environment: [
    { id: 'local', label: 'Local Deployment', value: 'local' },
    { id: 'cloud', label: 'Cloud API', value: 'cloud' }
  ],
  processor: [
    { id: 'cpu', label: 'CPU', value: 'cpu' },
    { id: 'gpu', label: 'GPU', value: 'gpu' }
  ],
  moondreamModel: [
    { id: '0.5b', label: '0.5B', value: '0.5b' },
    { id: '2b', label: '2B', value: '2b' }
  ],
  quantization: [
    { id: 'int8', label: 'INT8', value: 'int8' },
    { id: 'int4', label: 'INT4', value: 'int4' }
  ]
}

const ClipboardIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
  </svg>
)

const CheckIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

interface CopyButtonProps {
  text: string
}

const CopyButton: FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className="absolute top-3 right-3 p-2 rounded-lg hover:bg-[#F7F7F8] transition-colors"
      aria-label="Copy code"
    >
      {copied ? (
        <CheckIcon />
      ) : (
        <ClipboardIcon />
      )}
    </button>
  )
}

const getScriptVariables = (config: SelectedConfig): ScriptVariables => {
  if (config.environment === 'cloud') {
    return {
      modelUrl: '',
      libraryInstall: 'pip install moondream',
      modelPath: '',
      fileSize: ''
    }
  }

  const modelSize = config.moondreamModel === '0.5b' ? '0_5b' : '2b'
  const modelPath = `moondream-${modelSize}-${config.quantization}.mf.gz`
  const baseUrl = 'https://huggingface.co/vikhyatk/moondream2/resolve/onnx'
  
  return {
    modelUrl: `${baseUrl}/${modelPath}`,
    libraryInstall: config.processor === 'gpu' ? 'pip install moondream-gpu' : 'pip install moondream',
    modelPath,
    fileSize: `${modelSize === '0_5b' ? 
      (config.quantization === 'int4' ? '442 MB' : '622 MB') : 
      (config.quantization === 'int4' ? '1.22 GB' : '1.82 GB')}`
  }
}

const ConfigSelector: FC = () => {
  const [selectedConfig, setSelectedConfig] = useState<SelectedConfig>({
    environment: null,
    processor: null,
    moondreamModel: null,
    quantization: null
  })

  const handleSelection = (category: keyof SelectedConfig, value: string) => {
    if (category === 'environment') {
      // Reset other options when switching environment
      setSelectedConfig({
        environment: value,
        processor: value === 'cloud' ? 'none' : null,
        moondreamModel: value === 'cloud' ? 'none' : null,
        quantization: value === 'cloud' ? 'none' : null
      })
    } else {
      setSelectedConfig(prev => ({
        ...prev,
        [category]: value
      }))
    }
  }

  const generateScript = () => {
    if (!selectedConfig.environment) {
      return "Select environment to generate installation script"
    }

    if (selectedConfig.environment === 'cloud') {
      const pythonScript = `# Install dependencies in your project directory
pip install moondream

# Get your API key at console.moondream.ai
import moondream as md
from PIL import Image

# Initialize with API key
model = md.vl(api_key="your-api-key")

# Load an image
image = Image.open("path/to/image.jpg")

# Generate a caption
caption = model.caption(image)["caption"]
print("Caption:", caption)

# Ask a question
answer = model.query(image, "What's in this image?")["answer"]
print("Answer:", answer)

# Stream the response
for chunk in model.caption(image, stream=True)["caption"]:
    print(chunk, end="", flush=True)`

      const nodeScript = `// Install dependencies in your project directory
// npm install moondream

// Get your API key at console.moondream.ai
const { VL } = require('moondream');

async function main() {
  // Initialize with API key
  const model = new VL({ apiKey: 'your-api-key' });
  
  // Load an image
  const image = "path/to/image.jpg";
  
  // Generate caption
  const { caption } = await model.caption(image);
  console.log('Caption:', caption);
  
  // Ask questions about the image
  const { answer } = await model.query(image, "What's in this image?");
  console.log('Answer:', answer);
}

main().catch(console.error);`

      return (
        <Tabs items={['Python', 'Node.js']}>
          <Tabs.Tab>
            <div className="relative">
              <CopyButton text={pythonScript} />
              <pre className="text-sm text-gray-800 whitespace-pre-wrap pr-12">
                {pythonScript}
              </pre>
            </div>
          </Tabs.Tab>
          <Tabs.Tab>
            <div className="relative">
              <CopyButton text={nodeScript} />
              <pre className="text-sm text-gray-800 whitespace-pre-wrap pr-12">
                {nodeScript}
              </pre>
            </div>
          </Tabs.Tab>
        </Tabs>
      )
    }

    // For local deployment, we need all options selected
    if (!selectedConfig.processor || !selectedConfig.moondreamModel || !selectedConfig.quantization) {
      return "Select all options to generate installation script"
    }

    const vars = getScriptVariables(selectedConfig)
    const pythonScript = `# Install dependencies in your project directory
${vars.libraryInstall}

# Download model - run once then comment out (${vars.fileSize})
# Use: wget (Linux) or curl -O (macOS) or curl.exe -O (Windows)
wget ${vars.modelUrl}

import moondream as md
from PIL import Image

model = md.VL('${vars.modelPath}')
image = Image.open("path/to/image.jpg")

# Encode the image (optional, but recommended for multiple queries)
encoded_image = model.encode_image(image)

# Generate caption with streaming output
for t in model.caption(encoded_image, stream=True)["caption"]:
    print(t, end="", flush=True)

# Ask questions about the image
question = "What do you see in this image?"
for t in model.answer_question(encoded_image, question, stream=True)["answer"]:
    print(t, end="", flush=True)`

    const nodeScript = `// Install dependencies in your project directory
// npm install moondream${vars.libraryInstall.includes('gpu') ? '-gpu' : ''}

// Download model - run once then comment out (${vars.fileSize})
// Use: wget (Linux) or curl -O (macOS) or curl.exe -O (Windows)
wget ${vars.modelUrl}

const { VL } = require('moondream');

async function main() {
  const model = new VL('${vars.modelPath}');
  
  // Load and encode your image
  const image = "path/to/image.jpg";
  const encoded = await model.encodeImage(image);
  
  // Generate caption
  const { caption } = await model.caption(encoded);
  console.log('Caption:', caption);
  
  // Ask questions about the image
  const question = "What do you see in this image?";
  const { answer } = await model.answerQuestion(encoded, question);
  console.log('Answer:', answer);
}

main().catch(console.error);`

    return (
      <Tabs items={['Python', 'Node.js']}>
        <Tabs.Tab>
          <div className="relative">
            <CopyButton text={pythonScript} />
            <pre className="text-sm text-gray-800 whitespace-pre-wrap pr-12">
              {pythonScript}
            </pre>
          </div>
        </Tabs.Tab>
        <Tabs.Tab>
          <div className="relative">
            <CopyButton text={nodeScript} />
            <pre className="text-sm text-gray-800 whitespace-pre-wrap pr-12">
              {nodeScript}
            </pre>
          </div>
        </Tabs.Tab>
      </Tabs>
    )
  }

  return (
    <div className="w-full mt-8">
      <div className="rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-b from-white to-[#FCFCFD]">
        <table className="w-full border-collapse">
          <thead className="bg-[#F7F7F8]">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-[#565872] w-1/4">Environment</th>
              <th className="px-6 py-4 text-left font-medium text-[#565872]" colSpan={3}>Select One</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-6 py-4 text-gray-900 font-medium">
                Deployment
              </td>
              {configOptions.environment.map((option: ConfigOption) => (
                <td
                  key={option.id}
                  className={`px-6 py-4 cursor-pointer transition-all duration-200
                    ${selectedConfig.environment === option.value 
                      ? 'bg-[#F7F7F8] text-[#565872] font-medium shadow-[inset_0_0_0_1px_#E5E5E7]' 
                      : 'hover:bg-[#F7F7F8]/50 hover:text-[#565872]'}`}
                  onClick={() => handleSelection('environment', option.value)}
                >
                  {option.label}
                </td>
              ))}
              <td className="px-6 py-4" />
            </tr>
          </tbody>
        </table>
      </div>

      {selectedConfig.environment === 'local' && (
        <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-b from-white to-[#FCFCFD]">
          <table className="w-full border-collapse">
            <thead className="bg-[#F7F7F8]">
              <tr>
                <th className="px-6 py-4 text-left font-medium text-[#565872] w-1/4">Modifier</th>
                <th className="px-6 py-4 text-left font-medium text-[#565872]" colSpan={3}>Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Object.entries(configOptions)
                .filter(([category]) => category !== 'environment')
                .map(([category, options]) => (
                  <tr key={category}>
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </td>
                    {options.map((option: ConfigOption) => (
                      <td
                        key={option.id}
                        className={`px-6 py-4 cursor-pointer transition-all duration-200
                          ${selectedConfig[category as keyof SelectedConfig] === option.value 
                            ? 'bg-[#F7F7F8] text-[#565872] font-medium shadow-[inset_0_0_0_1px_#E5E5E7]' 
                            : 'hover:bg-[#F7F7F8]/50 hover:text-[#565872]'}`}
                        onClick={() => handleSelection(category as keyof SelectedConfig, option.value)}
                      >
                        {option.label}
                      </td>
                    ))}
                    {Array(Math.max(0, 3 - options.length)).fill(null).map((_, i) => (
                      <td key={`empty-${i}`} className="px-6 py-4" />
                    ))}
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8">
        <div className="rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-b from-white to-[#FCFCFD]">
          <div className="bg-[#F7F7F8] px-6 py-3 text-sm font-medium text-[#565872] border-b border-gray-200">
            Installation Script
          </div>
          <div className="p-6">
            {generateScript()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfigSelector 