import { Tabs } from "nextra/components";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/github-dark.css';

// Add style override to remove hljs backgrounds
const codeStyle = `
  .hljs {
    background: transparent !important;
  }
`;

interface ModelInfo {
  name: string;
  description: string;
  memoryRequired: string;
  size: string;
  compressedSize: string;
  downloadUrl: string;
  bestFor: string[];
}

const model2bVariants: ModelInfo[] = [
  {
    name: "INT8 Model",
    description: "Balanced performance and quality",
    memoryRequired: "2,624 MiB",
    size: "1,900 MiB",
    compressedSize: "1,733 MiB",
    downloadUrl: "https://huggingface.co/vikhyatk/moondream2/resolve/9dddae84d54db4ac56fe37817aeaeb502ed083e2/moondream-2b-int8.mf.gz",
    bestFor: [
      "Production APIs",
      "Cloud deployment",
      "High-throughput services"
    ]
  },
  {
    name: "INT4 Model",
    description: "Maximum compression",
    memoryRequired: "2,002 MiB",
    size: "1,290 MiB",
    compressedSize: "1,167 MiB",
    downloadUrl: "https://huggingface.co/vikhyatk/moondream2/resolve/9dddae84d54db4ac56fe37817aeaeb502ed083e2/moondream-2b-int4.mf.gz",
    bestFor: [
      "Memory constraints",
      "Local development",
      "Testing environments"
    ]
  }
];

const model05bVariants: ModelInfo[] = [
  {
    name: "INT8 Model (0.5B)",
    description: "Fast CPU inference",
    memoryRequired: "996 MiB",
    size: "660 MiB",
    compressedSize: "593 MiB",
    downloadUrl: "https://huggingface.co/vikhyatk/moondream2/resolve/9dddae84d54db4ac56fe37817aeaeb502ed083e2/moondream-0_5b-int8.mf.gz",
    bestFor: [
      "Raspberry Pi 4",
      "Edge devices",
      "Local development"
    ]
  },
  {
    name: "INT4 Model (0.5B)",
    description: "Ultra-lightweight deployment",
    memoryRequired: "816 MiB",
    size: "477 MiB",
    compressedSize: "422 MiB",
    downloadUrl: "https://huggingface.co/vikhyatk/moondream2/resolve/9dddae84d54db4ac56fe37817aeaeb502ed083e2/moondream-0_5b-int4.mf.gz",
    bestFor: [
      "Mobile devices",
      "IoT deployment",
      "Embedded systems"
    ]
  }
];



const DownloadTabs = ({ filename }: { filename: string }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  // Generate code snippets and highlight them
  const wgetCode = `wget https://huggingface.co/vikhyatk/moondream2/resolve/9dddae84d54db4ac56fe37817aeaeb502ed083e2/${filename}`;
  const curlCode = `curl -L -o ${filename} https://huggingface.co/vikhyatk/moondream2/resolve/9dddae84d54db4ac56fe37817aeaeb502ed083e2/${filename}`;
  const powershellCode = `curl.exe -L -o ${filename} https://huggingface.co/vikhyatk/moondream2/resolve/9dddae84d54db4ac56fe37817aeaeb502ed083e2/${filename}`;
  const pythonCode = `import requests

url = "https://huggingface.co/vikhyatk/moondream2/resolve/9dddae84d54db4ac56fe37817aeaeb502ed083e2/${filename}"
response = requests.get(url)
with open("${filename}", "wb") as f:
    f.write(response.content)`;

  const CodeBlock = ({ code, language }: { code: string, language: string }) => {
    const [copied, setCopied] = useState(false);
    const highlighted = hljs.highlight(code, { language }).value;

    const copyToClipboard = async () => {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className={`rounded-xl overflow-hidden border relative ${isDark ? 'bg-[#1A1A1A] border-white/20' : 'bg-[#FAFAF9] border-black/40'}`}>
        <div className="absolute right-2 top-2">
          <button
            onClick={copyToClipboard}
            className={`rounded-md px-2 py-1 text-sm ${
              isDark 
                ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-200' 
                : 'bg-[#f3f4f6] hover:bg-[#e5e7eb] border-[#d0d7de] text-[#24292f]'
            } border transition-colors`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className={`p-4 font-mono ${isDark ? 'text-gray-200' : 'text-[#24292f]'}`}>
          <code 
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </div>
    );
  };

  return (
    <>
      <style>{codeStyle}</style>
      <Tabs items={['Linux', 'Mac', 'Windows', 'Python']}>
        <Tabs.Tab>
          <CodeBlock code={wgetCode} language="bash" />
        </Tabs.Tab>
        <Tabs.Tab>
          <CodeBlock code={curlCode} language="bash" />
        </Tabs.Tab>
        <Tabs.Tab>
          <CodeBlock code={powershellCode} language="powershell" />
        </Tabs.Tab>
        <Tabs.Tab>
          <CodeBlock code={pythonCode} language="python" />
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

const ModelCard = ({ model, isDark }: { model: ModelInfo, isDark: boolean }) => {
  const filename = model.downloadUrl.split('/').pop() || '';
  
  return (
    <div className={`relative rounded-lg border overflow-hidden ${
      isDark ? 'bg-[#1A1A1A] border-white/20' : 'bg-white border-gray-200'
    }`}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <div>
            <h3 className={`text-2xl font-semibold ${isDark ? 'text-gray-100' : ''}`}>{model.name}</h3>
            <div className={isDark ? 'text-gray-300' : 'text-gray-600'}>{model.description}</div>
            <div className={`font-mono ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Requires <span className={isDark ? 'bg-[#4363CC]/20' : 'bg-yellow-50'}>{model.memoryRequired}</span> runtime memory
            </div>
          </div>
          <div className="text-left md:text-right mt-2 md:mt-0">
            <div className={`text-xl font-mono ${isDark ? 'text-gray-200' : ''}`}>{model.size}</div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Compressed: {model.compressedSize}</div>
            <div className="mt-2">
              <a href={model.downloadUrl} className="text-[#4363CC] hover:text-[#9FB6EB] text-sm">
                Direct Download →
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div>
            <h4 className={`font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Best For</h4>
            <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {model.bestFor.map((use, index) => (
                <li key={index}>• {use}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`mt-6 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className="mb-2">
            <code className={`text-sm px-2 py-1 rounded ${
              isDark ? 'bg-gray-800' : 'bg-gray-50'
            }`}>onnx branch</code>
          </div>
          <div className={`rounded-md border overflow-hidden ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <DownloadTabs filename={filename} />
            <div className={`text-xs p-2 border-t ${
              isDark ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-gray-50 text-gray-500 border-gray-200'
            }`}>
              Downloads: {filename}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ModelVariants() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <Tabs items={['2B Models', '0.5B Models']}>
      <Tabs.Tab>
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-[pulse_3s_ease-in-out_infinite]"></span>
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Recommended for most use cases</span>
          </div>
          <div className="space-y-4">
            {model2bVariants.map((model, index) => (
              <ModelCard key={index} model={model} isDark={isDark} />
            ))}
          </div>
        </div>
      </Tabs.Tab>
      <Tabs.Tab>
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-[pulse_3s_ease-in-out_infinite]"></span>
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Optimized for edge devices</span>
          </div>
          <div className="space-y-4">
            {model05bVariants.map((model, index) => (
              <ModelCard key={index} model={model} isDark={isDark} />
            ))}
          </div>
        </div>
      </Tabs.Tab>
    </Tabs>
  );
}
