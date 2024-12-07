import { FC, useState, ReactNode } from 'react';
import { Tabs } from 'nextra/components';

interface ConfigOption {
	id: string;
	label: string;
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
}

const configOptions: ConfigOptions = {
	environment: [
		{ id: 'cloud', label: 'Cloud API', value: 'cloud' },
		{ id: 'local', label: 'Local Deployment', value: 'local' },
	],
	processor: [
		{ id: 'cpu', label: 'CPU', value: 'cpu' },
		{ id: 'gpu', label: 'GPU', value: 'gpu' },
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

const ClipboardIcon = () => (
	<svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3'
		/>
	</svg>
);

const CheckIcon = () => (
	<svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
		<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
	</svg>
);

interface CopyButtonProps {
	text: string;
}

const CopyButton: FC<CopyButtonProps> = ({ text }) => {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<button onClick={copy} className='absolute top-3 right-3 p-2 rounded-lg hover:bg-[#F7F7F8] transition-colors' aria-label='Copy code'>
			{copied ? <CheckIcon /> : <ClipboardIcon />}
		</button>
	);
};

const getScriptVariables = (config: SelectedConfig): ScriptVariables => {
	if (config.environment === 'cloud') {
		return {
			modelUrl: '',
			libraryInstall: 'pip install moondream',
			modelPath: '',
			fileSize: '',
		};
	}

	const modelSize = config.moondreamModel === '0.5b' ? '0_5b' : '2b';
	const modelPath = `moondream-${modelSize}-${config.quantization}.mf.gz`;
	const baseUrl = 'https://huggingface.co/vikhyatk/moondream2/resolve/onnx';

	return {
		modelUrl: `${baseUrl}/${modelPath}`,
		libraryInstall: config.processor === 'gpu' ? 'pip install moondream-gpu' : 'pip install moondream',
		modelPath,
		fileSize: `${modelSize === '0_5b' ? (config.quantization === 'int4' ? '442 MB' : '622 MB') : config.quantization === 'int4' ? '1.22 GB' : '1.82 GB'}`,
	};
};

// Update the endpoint-specific styles
const endpointStyles = {
	caption: {
		header: 'text-gray-900 font-semibold border-l-4 border-emerald-500 pl-3 py-1 bg-emerald-50/30',
		content: 'border-l-4 border-emerald-500/20 pl-3 ml-3 text-gray-800',
	},
	query: {
		header: 'text-gray-900 font-semibold border-l-4 border-blue-500 pl-3 py-1 bg-blue-50/30',
		content: 'border-l-4 border-blue-500/20 pl-3 ml-3 text-gray-800',
	},
	detect: {
		header: 'text-gray-900 font-semibold border-l-4 border-violet-500 pl-3 py-1 bg-violet-50/30',
		content: 'border-l-4 border-violet-500/20 pl-3 ml-3 text-gray-600',
	},
	point: {
		header: 'text-gray-900 font-semibold border-l-4 border-amber-500 pl-3 py-1 bg-amber-50/30',
		content: 'border-l-4 border-amber-500/20 pl-3 ml-3 text-gray-600',
	},
};

// Update the components to include content wrapping
const EndpointHeader: FC<{ type: keyof typeof endpointStyles; children: ReactNode }> = ({ type, children }) => <div className={endpointStyles[type].header}>{children}</div>;

const EndpointContent: FC<{ type: keyof typeof endpointStyles; children: ReactNode }> = ({ type, children }) => <div className={endpointStyles[type].content}>{children}</div>;
// Update the code block wrapper for cloud examples
const CodeBlock: FC<{ text: string; children: ReactNode }> = ({ text, children }) => {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div 
			onClick={copy}
			className={`relative select-none cursor-pointer group transition-all duration-200
				${copied ? 'bg-[#F7F7F8]' : 'hover:bg-[#F7F7F8]'}`}
		>
			<div className="absolute top-2 right-2 z-10">
				<span className={`px-3 py-1.5 bg-[#565872] text-white text-sm rounded-md flex items-center gap-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
					{copied ? (
						<>
							<CheckIcon />
							Copied!
						</>
					) : (
						<>
							<ClipboardIcon />
							Click to copy
						</>
					)}
				</span>
			</div>
			<div className={`transition-opacity duration-300 ${copied ? 'opacity-25' : 'group-hover:opacity-75'}`}>
				{children}
			</div>
		</div>
	);
};

// Update the GuidanceNote component to hide on mobile
const GuidanceNote: FC<{show: boolean}> = ({show}) => (
	<div className={`
		hidden md:flex absolute -top-12 left-1/2 -translate-x-1/2 
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

# Get your API key at console.moondream.ai
import moondream as md
from PIL import Image

# Initialize with API key
model = md.vl(api_key="your-api-key")

# Load an image
image = Image.open("./path/to/image.jpg")
`,

				caption: `# Generate a caption
caption = model.caption(image)["caption"]
print("Caption:", caption)

# Stream the caption
for chunk in model.caption(image, stream=True)["caption"]:
    print(chunk, end="", flush=True)`,

				query: `# Ask a question
answer = model.query(image, "What's in this image?")["answer"]
print("Answer:", answer)

# Stream the answer
for chunk in model.query(image, "What's in this image?", stream=True)["answer"]:
    print(chunk, end="", flush=True)`,

				detect: `# Uncomment to use object detection
# detect_result = model.detect(image)
# print("Detected objects:", detect_result["detections"])`,

				point: `# Uncomment to use object localization
# point_result = model.point(image, "Where is the cat?")
# print("Coordinates:", point_result["coordinates"])`,
			};

			const nodeSections = {
				setup: `// Install dependencies in your project directory
// npm install moondream
const { vl } = require('moondream');
const fs = require('fs');

async function main() {
  // Get your API key at console.moondream.ai
  const model = new vl({
    apiKey: "your-api-key"
  });

  // Load an image
  const image = fs.readFileSync("./path/to/image.jpg");`,

				caption: `  // Generate caption
const caption = await model.caption(image, "normal", false);
console.log('Caption:', caption);

// Stream the caption
console.log('\\nStreaming caption:');
const captionStream = await model.caption(image, "normal", true);
for await (const chunk of captionStream.caption) {
  process.stdout.write(chunk);
}`,

				query: `  // Ask questions about the image
const answer = await model.query(image, "What's in this image?");
console.log('\\nAnswer:', answer);

// Stream the answer
console.log('\\nStreaming answer:');
const answerStream = await model.query(image, "What's in this image?", true);
for await (const chunk of answerStream.answer) {
  process.stdout.write(chunk);
}`,

				detect: `  // Uncomment to use object detection
  // const result = await model.detect(image, "car");
  // console.log('Detected objects:', result.objects);`,

				point: `  // Uncomment to use object localization
  // const result = await model.point(image, "person");
  // console.log('Coordinates:', result.points);`,

				closing: `}

main().catch(console.error);`
			};

			return (
				<Tabs items={['Python', 'Node.js']}>
					<Tabs.Tab>
						<CodeBlock text={Object.values(sections).join('\n\n')}>
							<pre className="text-sm text-gray-800 whitespace-pre-wrap pr-12">
								{sections.setup}

								{'\n'}
								<EndpointHeader type='caption'>Image Captioning</EndpointHeader>
								<EndpointContent type='caption'>{sections.caption}</EndpointContent>

								<EndpointHeader type='query'>Visual Question Answering</EndpointHeader>
								<EndpointContent type='query'>{sections.query}</EndpointContent>

								<EndpointHeader type='detect'>Object Detection</EndpointHeader>
								<EndpointContent type='detect'>{sections.detect}</EndpointContent>

								<EndpointHeader type='point'>Object Localization</EndpointHeader>
								<EndpointContent type='point'>{sections.point}</EndpointContent>
							</pre>
						</CodeBlock>
					</Tabs.Tab>
					<Tabs.Tab>
						<CodeBlock text={Object.values(nodeSections).join('\n\n')}>
							<pre className="text-sm text-gray-800 whitespace-pre-wrap pr-12">
								{nodeSections.setup}

								<EndpointHeader type='caption'>Image Captioning</EndpointHeader>
								<EndpointContent type='caption'>{nodeSections.caption}</EndpointContent>

								<EndpointHeader type='query'>Visual Question Answering</EndpointHeader>
								<EndpointContent type='query'>{nodeSections.query}</EndpointContent>

								<EndpointHeader type='detect'>Object Detection</EndpointHeader>
								<EndpointContent type='detect'>{nodeSections.detect}</EndpointContent>

								<EndpointHeader type='point'>Object Localization</EndpointHeader>
								<EndpointContent type='point'>{nodeSections.point}</EndpointContent>

								{nodeSections.closing}
							</pre>
						</CodeBlock>
					</Tabs.Tab>
				</Tabs>
			);
		}

		// For local deployment, we need all options selected
		if (!selectedConfig.processor || !selectedConfig.moondreamModel || !selectedConfig.quantization) {
			return 'Select all options to generate installation script';
		}

		const vars = getScriptVariables(selectedConfig);
		const pythonScript = `# Install dependencies in your project directory
${vars.libraryInstall}

# Download model - run once then comment out (${vars.fileSize})
# Use: curl -O (macOS) or wget (Linux) or curl.exe -O (Windows)
curl -O ${vars.modelUrl}

import moondream as md
from PIL import Image

model = md.vl('${vars.modelPath}')
image = Image.open("path/to/image.jpg")

# Encode the image (optional, but recommended for multiple queries)
encoded_image = model.encode_image(image)

# Generate caption with streaming output
for t in model.caption(encoded_image, stream=True)["caption"]:
    print(t, end="", flush=True)

# Ask questions about the image
question = "What do you see in this image?"
for t in model.answer_question(encoded_image, question, stream=True)["answer"]:
    print(t, end="", flush=True)`;

		const nodeScript = `// Install dependencies in your project directory
// npm install moondream${vars.libraryInstall.includes('gpu') ? '-gpu' : ''}

// Download model - run once then comment out (${vars.fileSize})
// Use: curl -O (macOS) or wget (Linux) or curl.exe -O (Windows)
curl -O ${vars.modelUrl}

const { vl } = require('moondream');

async function main() {
  const model = new vl('${vars.modelPath}');
  
  // Load and encode your image
  const image = "path/to/image.jpg";
  const encoded = await model.encodeImage(image);
  
  // Generate caption
  const { caption } = await model.caption(encoded);
  console.log('Caption:', caption);
  
  // Stream the caption
  console.log('\\nStreaming caption:');
  const captionStream = await model.caption(encoded, "normal", true);
  for await (const chunk of captionStream.caption) {
    process.stdout.write(chunk);
  }
  
  // Ask questions about the image
  const question = "What do you see in this image?";
  const { answer } = await model.answerQuestion(encoded, question);
  console.log('\\nAnswer:', answer);

  // Stream the answer
  console.log('\\nStreaming answer:');
  const answerStream = await model.answerQuestion(encoded, question, true);
  for await (const chunk of answerStream.answer) {
    process.stdout.write(chunk);
  }
}

main().catch(console.error);`;

		return (
			<Tabs items={['Python', 'Node.js']}>
				<Tabs.Tab>
					<div className='relative'>
						<CopyButton text={pythonScript} />
						<pre className='text-sm text-gray-800 whitespace-pre-wrap pr-12'>{pythonScript}</pre>
					</div>
				</Tabs.Tab>
				<Tabs.Tab>
					<div className='relative'>
						<CopyButton text={nodeScript} />
						<pre className='text-sm text-gray-800 whitespace-pre-wrap pr-12'>{nodeScript}</pre>
					</div>
				</Tabs.Tab>
			</Tabs>
		);
	};

	return (
		<div className='w-full mt-8 relative'>
			<GuidanceNote show={showGuidance} />
			
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
											? 'bg-[#565872] text-white font-medium scale-[1.02] shadow-lg' 
											: 'hover:bg-[#F7F7F8] text-[#565872] hover:text-[#454654]'}
										transition-all duration-300 ease-out
										hover:scale-[1.02] hover:shadow-md
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
													<span className="block w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:animate-ping" />
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
												{options.map((option: ConfigOption) => (
													<div
														key={option.id}
														className={`px-6 py-4 cursor-pointer select-none border-r border-gray-200 flex-1 group relative
															${selectedConfig[category as keyof SelectedConfig] === option.value
																? 'bg-[#565872] text-white font-medium scale-[1.02] shadow-lg'
																: 'hover:bg-[#F7F7F8] text-[#565872] hover:text-[#454654]'}
															transition-all duration-300 ease-out
															hover:scale-[1.02] hover:shadow-md
															before:absolute before:left-4 before:opacity-0 hover:before:opacity-100 
															before:transition-opacity before:content-["↳"] before:text-[#565872]
															before:hidden before:md:block
															border border-transparent hover:border-[#E5E5E7]
															${option === options[0] ? 'border-l border-gray-200' : ''}
															${option === options[options.length-1] ? 'border-r border-gray-200' : 'border-r border-gray-200'}`}
														onClick={() => handleSelection(category as keyof SelectedConfig, option.value)}
													>
														<div className='pl-0 md:pl-4'>
															{option.label}
															{selectedConfig[category as keyof SelectedConfig] !== option.value && 
															 selectedConfig[category as keyof SelectedConfig] === null && (
																<div className='text-xs text-gray-400 mt-1 group-hover:text-[#565872] flex items-center gap-1'>
																	<span className="w-4 h-4 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors flex items-center justify-center md:inline-flex hidden">
																		<span className="block w-1.5 h-1.5 rounded-full bg-blue-400 opacity-40 group-hover:opacity-60 group-hover:animate-ping" />
																	</span>
																	<span className="md:inline hidden">Click to select</span>
																</div>
															)}
														</div>
													</div>
												))}
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
