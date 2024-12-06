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
		{ id: 'local', label: 'Local Deployment', value: 'local' },
		{ id: 'cloud', label: 'Cloud API', value: 'cloud' },
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

const ConfigSelector: FC = () => {
	const [selectedConfig, setSelectedConfig] = useState<SelectedConfig>({
		environment: null,
		processor: null,
		moondreamModel: null,
		quantization: null,
	});

	const handleSelection = (category: keyof SelectedConfig, value: string) => {
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
pip install moondream

# Get your API key at console.moondream.ai
import moondream as md
from PIL import Image

# Initialize with API key
model = md.vl(api_key="your-api-key")

# Load an image
image = Image.open("path/to/image.jpg")
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

// Get your API key at console.moondream.ai
const { VL } = require('moondream');

async function main() {
  // Initialize with API key
  const model = new VL({ apiKey: 'your-api-key' });
  
  // Load an image
  const image = "path/to/image.jpg";
  `,

				caption: `  // Generate caption
  const { caption } = await model.caption(image);
  console.log('Caption:', caption);
  
  // Stream the caption
  console.log('\\nStreaming caption:');
  const captionStream = await model.caption(image, "normal", true);
  for await (const chunk of captionStream.caption) {
    process.stdout.write(chunk);
  }`,

				query: `  // Ask questions about the image
  const { answer } = await model.query(image, "What's in this image?");
  console.log('\\nAnswer:', answer);

  // Stream the answer
  console.log('\\nStreaming answer:');
  const answerStream = await model.query(image, "What's in this image?", true);
  for await (const chunk of answerStream.answer) {
    process.stdout.write(chunk);
  }`,

				detect: `  // Uncomment to use object detection
  // const { detections } = await model.detect(image);
  // console.log('Detected objects:', detections);`,

				point: `  // Uncomment to use object localization
  // const { coordinates } = await model.point(image, "Where is the cat?");
  // console.log('Coordinates:', coordinates);`,

				closing: `}

main().catch(console.error);`,
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
    print(t, end="", flush=True)`;

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
		<div className='w-full mt-8'>
			<div className='rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-b from-white to-[#FCFCFD]'>
				<table className='w-full border-collapse'>
					<thead className='bg-[#F7F7F8]'>
						<tr>
							<th className='px-6 py-4 text-left font-medium text-[#565872] w-1/4'>Environment</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-100 md:table-row-group flex flex-col md:flex-none'>
						<tr className='flex flex-col md:table-row'>
							<td className='px-6 py-4 text-gray-900 font-medium'>Deployment</td>
							{configOptions.environment.map((option: ConfigOption) => (
								<td
									key={option.id}
									className={`px-6 py-4 cursor-pointer select-none group relative
                    ${selectedConfig.environment === option.value ? 'bg-[#565872] text-white font-medium' : 'hover:bg-[#F7F7F8] text-[#565872] hover:text-[#454654]'}
                    transition-all duration-200 active:scale-[0.98]
                    before:absolute before:left-4 before:opacity-0 hover:before:opacity-100 
                    before:transition-opacity before:content-["↳"] before:text-[#565872]
                    border border-transparent hover:border-[#E5E5E7] hover:shadow-sm
                    ${!selectedConfig.environment ? 'border-dashed border-gray-300' : ''}`}
									onClick={() => handleSelection('environment', option.value)}
								>
									<div className='pl-4'>
										{option.label}
										{!selectedConfig.environment && <div className='text-xs text-gray-500 mt-1 group-hover:text-[#565872]'>Click to select</div>}
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
								<th className='px-6 py-4 text-left font-medium text-[#565872] w-1/4 border-r border-gray-200'>Modifier</th>
								<th className='px-6 py-4 text-left font-medium text-[#565872]' colSpan={3}>
									Options
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-200'>
							{Object.entries(configOptions)
								.filter(([category]) => category !== 'environment')
								.map(([category, options]) => (
									<tr key={category} className='flex flex-col md:table-row'>
										<td className='px-6 py-4 text-gray-900 font-medium bg-[#F7F7F8] md:bg-transparent border-r border-gray-200'>
											{category.replace(/([A-Z])/g, ' $1').trim()}
										</td>
										<td className='flex flex-col md:table-cell md:flex-row border-t first:border-t-0 md:border-t-0' colSpan={3}>
											{options.map((option: ConfigOption) => (
												<div
													key={option.id}
													className={`px-6 py-4 cursor-pointer select-none md:border-r last:border-r-0 border-gray-200
														${selectedConfig[category as keyof SelectedConfig] === option.value
															? 'bg-[#565872] text-white font-medium'
															: 'hover:bg-[#F7F7F8] text-[#565872] hover:text-[#454654]'}
														transition-all duration-200 active:scale-[0.98]
														before:content-["↳_"] before:opacity-0 hover:before:opacity-100 before:transition-opacity
														border border-transparent hover:border-[#E5E5E7] hover:shadow-sm`}
													onClick={() => handleSelection(category as keyof SelectedConfig, option.value)}
												>
													{option.label}
												</div>
											))}
										</td>
									</tr>
								))}
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
