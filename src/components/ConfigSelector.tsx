import { FC, useState } from 'react';
import { Tabs } from 'nextra/components';
import Link from 'next/link';

interface ConfigOption {
	id: string;
	label: string | React.ReactNode;
	value: string;
}

interface ConfigOptions {
	environment: ConfigOption[];
	processor: ConfigOption[];
	moondreamModel: ConfigOption[];
	quantization: ConfigOption[];
}

interface SelectedConfig {
	environment: string | null;
	processor: string | null;
	moondreamModel: string | null;
	quantization: string | null;
}

interface ScriptVariables {
	modelUrl: string;
	libraryInstall: string;
	modelPath: string;
	fileSize: string;
	memoryUsage: string;
}

interface TooltipProps {
	text: string;
	children: React.ReactNode;
}

interface ConsoleCardProps {
	show: boolean;
}

const Tooltip: FC<TooltipProps> = ({ text, children }) => (
	<div className="group relative inline-block">
		{children}
		<div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full 
			opacity-0 group-hover:opacity-100 transition-opacity duration-200">
			<div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
				{text}
				<div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2">
					<div className="border-4 border-transparent border-t-gray-900" />
				</div>
			</div>
		</div>
	</div>
);

const configOptions: ConfigOptions = {
	environment: [
		{ id: 'cloud', label: 'Cloud API', value: 'cloud' },
		{ id: 'local', label: 'Local Deployment', value: 'local' },
	],
	processor: [
		{ id: 'cpu', label: 'CPU', value: 'cpu' },
		{ id: 'gpu', label: (
			<div className="flex items-center gap-1 opacity-50 cursor-not-allowed">
				GPU
				<Tooltip text="Coming soon">
					<span className="bg-yellow-100 text-yellow-800 text-xs px-1.5 py-0.5 rounded">
						Coming Soon
					</span>
				</Tooltip>
			</div>
		), value: 'gpu' },
	],
	moondreamModel: [
		{ id: '0.5b', label: '0.5B', value: '0.5b' },
		{ id: '2b', label: '2B', value: '2b' },
	],
	quantization: [
		{ id: 'int8', label: 'INT8', value: 'int8' },
		{ id: 'int4', label: 'INT4', value: 'int4' },
	],
};

// Update the CodeBlock component to use the new syntax highlighting while preserving the Node.js code
const CodeBlock: FC<{ code: string }> = ({ code }) => {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// First escape HTML to prevent XSS and formatting issues
	const escaped = code
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

	const highlighted = escaped
		// Strings - handle both single and double quotes
		.replace(/(['"])(.*?)\1/g, '<span style="color: #032f62">$1$2$1</span>')
		// Keywords
		.replace(/\b(import|from|const|let|var|function|async|await|try|catch|for|if|else|return)\b/g, 
			'<span style="color: #d73a49">$1</span>')
		// Constants
		.replace(/\b(true|false|null|undefined)\b/g, 
			'<span style="color: #005cc5">$1</span>')
		// Function calls - avoid matching already colored text
		.replace(/(?<!<[^>]*)\b(\w+)(?=\()/g, '<span style="color: #6f42c1">$1</span>');

	return (
		<div className="relative rounded-lg bg-[#f6f8fa] border border-[#d0d7de] p-4 overflow-x-auto">
			<button
				onClick={copyToClipboard}
				className="absolute right-2 top-2 rounded-md bg-[#f3f4f6] hover:bg-[#e5e7eb] border border-[#d0d7de] px-2 py-1 text-sm text-[#24292f]"
			>
				{copied ? "Copied!" : "Copy"}
			</button>
			<pre 
				className="font-mono text-sm text-[#24292f]"
				dangerouslySetInnerHTML={{ 
					__html: highlighted 
				}}
			/>
		</div>
	);
};

// Update the GuidanceNote component to hide on mobile
const GuidanceNote: FC<{show: boolean}> = ({show}) => (
	<div className={`
		hidden md:flex absolute -top-8 left-1/2 -translate-x-1/2 
		bg-blue-50 text-blue-600 px-4 py-2 rounded-full shadow-sm
		border border-blue-100 text-sm font-medium
		items-center gap-2
		transition-all duration-500
		${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
	`}>
		<svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
		</svg>
		Select your deployment environment
	</div>
);

// Update the ConsoleCard component to use conditional rendering
const ConsoleCard: FC<ConsoleCardProps> = ({ show }) => {
	if (!show) return null;
	
	return (
		<div className="mt-8 transition-all duration-300 ease-out transform translate-y-0">
			<div className="rounded-xl overflow-hidden border border-blue-200 bg-gradient-to-b from-blue-50/50 to-blue-50/30">
				<div className="px-6 py-4">
					<div>
						<h3 className="text-blue-900 font-medium">Get Your API Key</h3>
						<p className="text-blue-700 text-sm mt-1">
							Visit <Link href="https://console.moondream.ai" target="_blank" rel="noopener noreferrer" className='border-b border-blue-700'>console.moondream.ai</Link> to create an account and get your API key.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const getScriptVariables = (config: SelectedConfig): ScriptVariables => {
	if (config.environment === 'cloud') {
		return {
			modelUrl: '',
			libraryInstall: '# pip install moondream',
			modelPath: '',
			fileSize: '',
			memoryUsage: ''
		};
	}

	// Map of all model configurations to their details
	const modelConfigs = {
		'2b': {
			'int8': {
				url: 'https://huggingface.co/vikhyatk/moondream2/resolve/9dddae84d54db4ac56fe37817aeaeb502ed083e2/moondream-2b-int8.mf.gz',
				path: 'moondream-2b-int8.mf.gz',
				size: '1,733 MiB',
				memory: '2,624 MiB'
			},
			'int4': {
				url: 'https://huggingface.co/vikhyatk/moondream2/resolve/9dddae84d54db4ac56fe37817aeaeb502ed083e2/moondream-2b-int4.mf.gz',
				path: 'moondream-2b-int4.mf.gz',
				size: '1,167 MiB',
				memory: '2,002 MiB'
			}
		},
		'0.5b': {
			'int8': {
				url: 'https://huggingface.co/vikhyatk/moondream2/resolve/9dddae84d54db4ac56fe37817aeaeb502ed083e2/moondream-0_5b-int8.mf.gz',
				path: 'moondream-0_5b-int8.mf.gz',
				size: '593 MiB',
				memory: '996 MiB'
			},
			'int4': {
				url: 'https://huggingface.co/vikhyatk/moondream2/resolve/9dddae84d54db4ac56fe37817aeaeb502ed083e2/moondream-0_5b-int4.mf.gz',
				path: 'moondream-0_5b-int4.mf.gz',
				size: '422 MiB',
				memory: '816 MiB'
			}
		}
	};

	const modelConfig = modelConfigs[config.moondreamModel as '2b' | '0.5b'][config.quantization as 'int8' | 'int4'];

	return {
		modelUrl: modelConfig.url,
		libraryInstall: config.processor === 'gpu' ? '# pip install moondream-gpu' : '# pip install moondream',
		modelPath: modelConfig.path,
		fileSize: modelConfig.size,
		memoryUsage: modelConfig.memory
	};
};

const ConfigSelector: FC = () => {
	// Add state for guidance
	const [showGuidance, setShowGuidance] = useState(true);
	
	// Existing state
	const [selectedConfig, setSelectedConfig] = useState<SelectedConfig>({
		environment: 'cloud',
		processor: 'none',
		moondreamModel: 'none',
		quantization: 'none',
	});

	const handleSelection = (category: keyof SelectedConfig, value: string) => {
		setShowGuidance(false);
		if (category === 'environment') {
			// Reset other options when switching environment
			setSelectedConfig({
				environment: value,
				processor: value === 'cloud' ? 'none' : null,
				moondreamModel: value === 'cloud' ? 'none' : null,
				quantization: value === 'cloud' ? 'none' : null,
			});
		} else {
			setSelectedConfig((prev) => ({
				...prev,
				[category]: value,
			}));
		}
	};

	const generateScript = () => {
		if (!selectedConfig.environment) {
			return 'Select environment to generate installation script';
		}

		if (selectedConfig.environment === 'cloud') {
			const sections = {
				setup: `# Install dependencies in your project directory
# pip install moondream

import moondream as md
from PIL import Image

# Initialize with API key
model = md.vl(api_key="your-api-key")

# Load an image
image = Image.open("./path/to/image.jpg")
encoded_image = model.encode_image(image)  # Encode image (recommended for multiple operations)
`,

				caption: `# Generate a caption (length options: "short" or "normal" (default))
caption = model.caption(encoded_image)["caption"]
print("Caption:", caption)

# Stream the caption
for chunk in model.caption(encoded_image, stream=True)["caption"]:
    print(chunk, end="", flush=True)`,

				query: `# Ask a question
answer = model.query(encoded_image, "What's in this image?")["answer"]
print("Answer:", answer)

# Stream the answer
for chunk in model.query(encoded_image, "What's in this image?", stream=True)["answer"]:
    print(chunk, end="", flush=True)`,

				detect: `# Detect objects
detect_result = model.detect(image, 'subject')  # change 'subject' to what you want to detect
print("Detected objects:", detect_result["objects"])`,

				point: `# Point at an object
point_result = model.point(image, 'subject')  # change 'subject' to what you want to point at
print("Points:", point_result["points"])`,
			};

			const nodeSections = {
				setup: `// Install dependencies in your project directory
// npm install moondream
const { vl } = require('moondream');
const fs = require('fs');

async function main() {
const model = new vl({
	apiKey: "your-api-key"
});

// Load an image
const encodedImage = Buffer.from(fs.readFileSync("./path/to/image.jpg"))  // Load and encode image`,

				caption: `// Generate caption (length options: "short" or "normal" (default))
const caption = await model.caption({ image: encodedImage })
console.log("Caption:", caption)

// Stream the caption
process.stdout.write("Streaming caption: ")
const captionStream = await model.caption({ image: encodedImage, stream: true })
for await (const chunk of captionStream.caption) process.stdout.write(chunk)`,

				query: `// Ask questions about the image
const answer = await model.query({ image: encodedImage, question: "What's in this image?" })
console.log("\\nAnswer:", answer)

// Stream the answer
process.stdout.write("Streaming answer: ")
const answerStream = await model.query({ image: encodedImage, question: "What's in this image?", stream: true })
for await (const chunk of answerStream.answer) process.stdout.write(chunk)`,

				detect: `// Detect objects
const detectResult = await model.detect({ image: encodedImage, object: "subject" })  // change 'subject' to what you want to detect
console.log("Detected objects:", detectResult.objects)`,

				point: `// Point at an object
const pointResult = await model.point({ image: encodedImage, object: "subject" })  // change 'subject' to what you want to point at
console.log("Points:", pointResult.points)`,

				closing: `}

main().catch(console.error);`
			};

			const curlSections = {
				setup: `# Replace \${process.env.MOONDREAM_API_KEY} with your API key from console.moondream.ai
`,

				query: `# Replace {endpoint} with: query, caption, detect, or point
curl --location 'https://api.moondream.ai/v1/{endpoint}' \\
--header 'X-Moondream-Auth: \${process.env.MOONDREAM_API_KEY}' \\
--header 'Content-Type: application/json' \\
--data '{
    "image_url": "data:image/jpeg;base64,<BASE64-STRING>",
    "stream": false,
    # Additional parameters per endpoint:
    # query:   "question": "What is this?" # Question to ask
    # caption: "length": "normal" or "long" # Length of caption
    # detect:  "object": "object" # Object to detect
    # point:   "object": "object" # Object to point at
}'`
			};

			return (
				<Tabs items={['Python', 'Node.js', 'cURL']}>
					<Tabs.Tab>
						<CodeBlock code={Object.values(sections).join('\n\n')} />
					</Tabs.Tab>
					<Tabs.Tab>
						<CodeBlock code={Object.values(nodeSections).join('\n\n')} />
					</Tabs.Tab>
					<Tabs.Tab>
						<CodeBlock code={Object.values(curlSections).join('\n\n')} />
					</Tabs.Tab>
				</Tabs>
			);
		}

		// For local deployment, we need all options selected
		if (!selectedConfig.processor || !selectedConfig.moondreamModel || !selectedConfig.quantization) {
			return 'Select all options to generate installation script';
		}

		const vars = getScriptVariables(selectedConfig);
		const pythonScript = `# ===== STEP 1: Install Dependencies =====
${vars.libraryInstall}  # Install dependencies in your project directory
${vars.libraryInstall.includes('gpu') ? `
# Prerequisites for GPU support
# - [CUDA 12.x](https://developer.nvidia.com/cuda-downloads)
# - [cuDNN 9.x](https://developer.nvidia.com/cudnn)` : ''}

# ===== STEP 2: Download Model =====
# Download model (${vars.fileSize} download size, ${vars.memoryUsage} memory usage)
# Use: wget (Linux and Mac) or curl.exe -O (Windows)
# wget ${vars.modelUrl}

import moondream as md
from PIL import Image

model = md.vl(model='./${vars.modelPath}')  # Initialize model
image = Image.open("./path/to/image.jpg")  # Load image
encoded_image = model.encode_image(image)  # Encode image (recommended for multiple operations)

# 1. Caption any image (length options: "short" or "normal" (default))
caption = model.caption(encoded_image)["caption"]
print("Caption:", caption)

print("Streaming caption:", end=" ", flush=True)
for chunk in model.caption(encoded_image, stream=True)["caption"]:
    print(chunk, end="", flush=True)

# 2. Query any image
answer = model.query(encoded_image, "What do you see in this image?")["answer"]
print("\\nAnswer:", answer)  # Single response

print("Streaming answer:", end=" ", flush=True)
for chunk in model.query(encoded_image, "What's in this image?", stream=True)["answer"]:
    print(chunk, end="", flush=True)

# 3. Detect any object
detect_result = model.detect(encoded_image, "subject")  # change 'subject' to what you want to detect
print("\\nDetected:", detect_result["objects"])

${selectedConfig.moondreamModel === '2b' ? `# 4. Point at any object
point_result = model.point(encoded_image, "subject")  # 'subject' can be any object
print("Points:", point_result["points"])` : '# Point functionality is only available for 2B models'}`;

		const nodeScript = `// ===== STEP 1: Install Dependencies =====
// npm install moondream${vars.libraryInstall.includes('gpu') ? '-gpu' : ''}  # Install Node.js client
// pip install moondream  # Install Python server (required for local inference)
${vars.libraryInstall.includes('gpu') ? `
// Prerequisites for GPU support
// - [CUDA 12.x](https://developer.nvidia.com/cuda-downloads)
// - [cuDNN 9.x](https://developer.nvidia.com/cudnn)` : ''}

// ===== STEP 2: Download Model =====
// Download model - run once then comment out (${vars.fileSize})
// Use: wget (Linux and Mac) or curl.exe -O (Windows)
// wget ${vars.modelUrl}

// ===== STEP 3: Start Local Server =====
// moondream serve --model ${vars.modelPath}  # Run in separate terminal

// ===== STEP 4: Node.js Client Code =====
const { vl } = require('moondream');
const fs = require('fs');

const model = new vl({ apiUrl: "http://localhost:3475", timeout: 300000 });  // Initialize client

async function main() {
	try {
		const encodedImage = Buffer.from(fs.readFileSync("./path/to/image.jpg"))  // Load and encode image

		// 1. Caption any image (length options: "short" or "normal" (default))
		const caption = await model.caption({ image: encodedImage })
		console.log("Caption:", caption)

		process.stdout.write("Streaming caption: ")
		const captionStream = await model.caption({ image: encodedImage, stream: true })
		for await (const chunk of captionStream.caption) process.stdout.write(chunk)

		// 2. Query any image
		const answer = await model.query({ image: encodedImage, question: "What's in this image?" })
		console.log("\\nAnswer:", answer)  // Single response

		process.stdout.write("Streaming answer: ")
		const answerStream = await model.query({ image: encodedImage, question: "What's in this image?", stream: true })
		for await (const chunk of answerStream.answer) process.stdout.write(chunk)

		// 3. Detect any object
		const detectResult = await model.detect({ image: encodedImage, object: "subject" })  // change 'subject' to what you want to detect
		console.log("\\nDetected:", detectResult.objects)

		${selectedConfig.moondreamModel === '2b' ? `// 4. Point at any object
		const pointResult = await model.point({ image: encodedImage, object: "subject" })  // 'subject' can be any object
		console.log("Points:", pointResult.points)` : '// Point functionality is only available for 2B models'}

	} catch (error) { console.error("Error:", error) }
}

main().catch(console.error);`;

		return (
			<Tabs items={['Python', 'Node.js']}>
				<Tabs.Tab>
					<CodeBlock code={pythonScript} />
				</Tabs.Tab>
				<Tabs.Tab>
					<CodeBlock code={nodeScript} />
				</Tabs.Tab>
			</Tabs>
		);
	};

	return (
		<div className='w-full mt-8 relative'>
			<div className='py-4'>
				<GuidanceNote show={showGuidance} />
			</div>
			
			<div className='rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-b from-white to-[#FCFCFD] relative'>
				<div className="absolute inset-0 bg-grid-pattern opacity-5" />
				<table className='w-full border-collapse relative'>
					<thead className='bg-[#F7F7F8]'>
						<tr>
							<th colSpan={2} className='px-6 py-4 text-left font-medium text-[#565872]'>
								Environment
								<div className="text-xs font-normal text-gray-500 mt-1">Choose your deployment method</div>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							{configOptions.environment.map((option: ConfigOption) => (
								<td
									key={option.id}
									className={`
										w-1/2 px-6 py-4 cursor-pointer select-none group relative
										${selectedConfig.environment === option.value 
											? 'bg-[#565872] text-white font-medium shadow-lg' 
											: 'hover:bg-[#F7F7F8] text-[#565872] hover:text-[#454654]'}
										transition-all duration-300 ease-out
										before:absolute before:left-4 before:opacity-0 hover:before:opacity-100 
										before:transition-opacity before:content-["↳"] before:text-[#565872]
										before:hidden before:md:block
										border border-transparent hover:border-[#E5E5E7]
										${!selectedConfig.environment && 'animate-pulse'}
										${option.id === 'cloud' ? 'border-r border-gray-200' : ''}
									`}
									onClick={() => handleSelection('environment', option.value)}
								>
									<div className='pl-0 md:pl-4'>
										{option.label}
										{selectedConfig.environment !== option.value && (
											<div className='text-xs text-gray-400 mt-1 group-hover:text-[#565872] flex items-center gap-1'>
												<span className="w-4 h-4 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors flex items-center justify-center md:inline-flex hidden">
													<span className="block w-1.5 h-1.5 rounded-full bg-blue group-hover:animate-ping" />
												</span>
												<span className="md:inline hidden">Click to select</span>
											</div>
										)}
									</div>
								</td>
							))}
						</tr>
					</tbody>
				</table>
			</div>

			<ConsoleCard show={selectedConfig.environment === 'cloud'} />

			{selectedConfig.environment === 'local' && (
				<div className='mt-4 rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-b from-white to-[#FCFCFD]'>
					<div className='bg-[#F7F7F8] px-6 py-4 text-left font-medium text-[#565872] md:hidden'>
						Modifiers
					</div>
					<table className='w-full border-collapse'>
						<thead className='bg-[#F7F7F8] hidden md:table-header-group'>
							<tr className='border-b border-gray-200'>
								<th className='px-6 py-4 text-left font-medium text-[#565872] w-1/4 border-r border-gray-200'>Configuration</th>
								<th className='px-6 py-4 text-left font-medium text-[#565872]' colSpan={3}>
									Options
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-200'>
							{Object.entries(configOptions)
								.filter(([category]) => category !== 'environment')
								.map(([category, options]) => {
									// Check if this row should be active based on previous selections
									const isActive = category === 'processor' ? true :
										category === 'moondreamModel' ? selectedConfig.processor !== null :
										category === 'quantization' ? selectedConfig.moondreamModel !== null :
										false;

									return (
										<tr key={category} className={`flex flex-col md:table-row transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
											<td className='px-6 py-4 text-gray-900 font-medium bg-[#F7F7F8] md:bg-transparent border-r border-gray-200'>
												{category === 'processor' ? 'Processor' :
												 category === 'moondreamModel' ? 'Moondream Model' :
												 category === 'quantization' ? 'Quantization' :
												 category.replace(/([A-Z])/g, ' $1').trim()}
											</td>
											<td className='flex flex-row border-t first:border-t-0 md:border-t-0' colSpan={3}>
												{options.map((option: ConfigOption) => {
													const isDisabled = option.id === 'gpu';
													
													return (
														<div
															key={option.id}
															className={`px-6 py-4 select-none border-r border-gray-200 flex-1 group relative
																${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
																${selectedConfig[category as keyof SelectedConfig] === option.value
																	? 'bg-[#565872] text-white font-medium shadow-lg'
																	: 'hover:bg-[#F7F7F8] text-[#565872] hover:text-[#454654]'}
																transition-all duration-300 ease-out
																${!isDisabled && 'hover:shadow-md'}
																before:absolute before:left-4 before:opacity-0 hover:before:opacity-100 
																before:transition-opacity before:content-["↳"] before:text-[#565872]
																before:hidden before:md:block
																border border-transparent hover:border-[#E5E5E7]
																${option === options[0] ? 'border-l border-gray-200' : ''}
																${option === options[options.length-1] ? 'border-r border-gray-200' : 'border-r border-gray-200'}`}
															onClick={() => !isDisabled && handleSelection(category as keyof SelectedConfig, option.value)}
														>
															<div className='pl-0 md:pl-4'>
																{option.label}
																{selectedConfig[category as keyof SelectedConfig] !== option.value && 
																 selectedConfig[category as keyof SelectedConfig] === null && 
																 !isDisabled && (
																	<div className='text-xs text-gray-400 mt-1 group-hover:text-[#565872] flex items-center gap-1'>
																		<span className="w-4 h-4 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors flex items-center justify-center md:inline-flex hidden">
																			<span className="block w-1.5 h-1.5 rounded-full bg-blue opacity-80 group-hover:opacity-60 group-hover:animate-ping" />
																		</span>
																		<span className="md:inline hidden">Click to select</span>
																	</div>
																)}
															</div>
														</div>
													);
												})}
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			)}

			<div className='mt-8'>
				<div className='rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-b from-white to-[#FCFCFD]'>
					<div className='bg-[#F7F7F8] px-6 py-3 text-sm font-medium text-[#565872] border-b border-gray-200'>Installation Script</div>
					<div className='p-6 overflow-x-auto'>{generateScript()}</div>
				</div>
			</div>
		</div>
	);
};

export default ConfigSelector;
