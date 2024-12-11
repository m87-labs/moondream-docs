# Contributing to Moondream Documentation

Thank you for your interest in contributing to the Moondream documentation! This guide will help you get started with making contributions.

## 🚀 Getting Started

1. **Fork and Clone**

   ~~~bash
   git clone https://github.com/m87-labs/moondream-docs.git
   cd moondream-docs
   ~~~

2. **Install Dependencies**

   ~~~bash
   npm install
   ~~~

3. **Start Development Server**

   ~~~bash
   npm run dev
   ~~~

4. **View Local Documentation** Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Making Changes

### File Structure

- All documentation pages are in `src/pages/`
- Use `.mdx` files for documentation pages
- Navigation is controlled by `_meta.tsx` files

### Adding New Pages

1. Create a new `.mdx` file in the appropriate directory
2. Update the corresponding `_meta.tsx` file to include your page
3. Follow the existing structure and formatting

By default, all MDX routes in the filesystem will be shown on the sidebar. But you can hide specific pages or folders by using the "display": "hidden" configuration:

pages/_meta.tsx:

~~~typescript
export default {
  index: 'My Homepage',
  contact: {
    display: 'hidden'
  },
  about: 'About Us'
}
~~~

The page will still be accessible via the /contact URL, but it will not be shown in the sidebar.

### Writing Guidelines

- Use clear, concise language
- Include code examples where appropriate
- Add proper headings and sections
- Use Nextra components for enhanced formatting

## 🎯 Nextra Features to Utilize

### Callouts

Various types of callouts to highlight important information:

~~~mdx
<Callout type="info">
  Moondream works best with CUDA-enabled GPUs for faster inference.
</Callout>

<Callout type="warning">
  Make sure to clear CUDA cache when processing large batches of images.
</Callout>

<Callout type="error">
  Never expose your API keys in your code. Use environment variables instead.
</Callout>
~~~

### Tabs

Different installation methods:

~~~mdx
<Tabs items={['pip', 'conda', 'source']}>
  <Tabs.Tab>
    ~~~bash
    pip install moondream
    ~~~
  </Tabs.Tab>
  <Tabs.Tab>
    ~~~bash
    conda install -c conda-forge moondream
    ~~~
  </Tabs.Tab>
</Tabs>
~~~

### Steps

Guide users through complex processes:

~~~mdx
<Steps>
### Install Dependencies
First, install Moondream and its dependencies:
~~~bash
pip install moondream torch pillow
~~~

### Download Model

The model will be downloaded automatically on first use.

### Process Images

Load and process your images:

~~~bash
from PIL import Image
image = Image.open("image.jpg")
~~~

</Steps>
~~~

### File Tree

Show project structure:

~~~mdx
<FileTree>
  <FileTree.Folder name="moondream-project" defaultOpen>
    <FileTree.Folder name="images">
      <FileTree.File name="sample.jpg" />
    </FileTree.Folder>
    <FileTree.File name="main.py" />
  </FileTree.Folder>
</FileTree>
~~~

### Cards

Showcase different features:

~~~mdx
<Cards>
  <Cards.Card
    icon="🖼️"
    title="Image Captioning"
    href="/docs/cookbook/basic-usage"
  />
  <Cards.Card
    icon="💬"
    title="Visual Q&A"
    href="/docs/cookbook/qa"
  />
</Cards>
~~~

### Code Blocks

With highlighting and filename:

```mdx
```python filename="example.py" {3,7-8} showLineNumbers
from moondream import vl
model = vl()  # Initialize model
print("Model loaded!")
```

```

## 🔍 Review Process

1. **Create a Branch**

   ~~~bash
   git checkout -b feature/your-feature-name
   ~~~

2. **Make Changes**

   - Follow the writing guidelines
   - Test your changes locally
   - Ensure all links work

3. **Commit Changes**

   ~~~bash
   git add .
   git commit -m "Description of changes"
   ~~~

4. **Submit Pull Request**
   - Push to your fork
   - Create a pull request
   - Fill out the PR template
   - Wait for review

## 🎨 Style Guide

### Markdown

- Use ATX-style headers (`#` for h1, `##` for h2, etc.)
- Include blank lines between sections
- Use backticks for inline code
- Use fenced code blocks with language specification

## 📚 API Specifications

### Base URL
```
<https://api.moondream.ai>

```

### Endpoints
- Image Captioning: `/v1/caption`
- Visual Question Answering: `/v1/query`
- Object Detection: `/v1/detect`
- Object Pointing: `/v1/point`

### Request Models
```python
class VqaRequest(BaseModel):
    image_url: str
    question: str
    stream: Optional[bool] = False

class CaptionRequest(BaseModel):
    image_url: str
    length: Optional[str] = "long"
    stream: Optional[bool] = False

class DetectRequest(BaseModel):
    image_url: str
    object: str

class PointRequest(BaseModel):
    image_url: str
    object: str
```

### Response Models

Non-Streaming:

```python
class DetectResponse(BaseModel):
    result: List[Dict[str, float]]

class PointResponse(BaseModel):
    result: List[Dict[str, float]]

class CaptionResponse(BaseModel):
    result: str

class VqaResponse(BaseModel):
    result: str
```

Streaming (Same for VQA and Captioning):

```python
# Intermediate chunks
{
    'chunk': str,  # token from stream
    'completed': False
}

# Final chunk
{
    'chunk': str,
    'completed': True
}
```

### Code Examples

- Keep examples minimal and focused on a single concept
- Include essential imports and setup only
- Use meaningful but short variable names
- Include brief comments only where necessary
- Show the simplest path to achieve the desired outcome
- Always provide examples in all supported formats:
  - curl (REST API with bash)
  - Python (using standard library)
  - Node.js (using https module)
  - Browser (using Fetch API)
  - Axios (using axios library)
- For API examples:
  - Use consistent example values across all formats
  - Include proper error handling in each example
  - Show environment variable usage for API keys
  - Include only required parameters in basic examples
  - Add advanced options separately if needed
  - Keep request/response pairs clear and aligned
  - Use consistent header formatting
  - Include proper content-type headers
  - Show proper base64 encoding for binary data when needed

Example format for API documentation:

```bash
# curl
# Convert image to base64
IMAGE_BASE64=$(base64 -i image.jpg)

# Make API request
curl -X POST https://api.moondream.ai/v1/caption \
  -H "Content-Type: application/json" \
  -H "X-Moondream-Auth: $MOONDREAM_API_KEY" \
  -d "{
    \"image_url\": \"data:image/jpeg;base64,$IMAGE_BASE64\",
    \"length\": \"long\",
    \"stream\": false
  }"
```

```python
# Python
import os
from urllib.request import Request, urlopen
import json
import base64

# Load image file and convert to base64
def get_base64_image(image_path):
    with open(image_path, "rb") as f:
        return base64.b64encode(f.read()).decode()

# Get API key from environment variable
api_key = os.getenv("MOONDREAM_API_KEY")
if not api_key:
    raise ValueError("Please set MOONDREAM_API_KEY environment variable")

# Prepare request
image_base64 = get_base64_image("image.jpg")
data = {
    "image_url": f"data:image/jpeg;base64,{image_base64}",
    "length": "long",
    "stream": False
}

# Set up request headers
headers = {
    "X-Moondream-Auth": api_key,
    "Content-Type": "application/json"
}

# Make request using standard library
req = Request(
    "https://api.moondream.ai/v1/caption",
    data=json.dumps(data).encode(),
    headers=headers,
    method="POST"
)

# Send request and handle response
try:
    with urlopen(req) as response:
        result = json.loads(response.read())
        print(result["result"])
except Exception as e:
    print(f"Error: {e}")
```

```javascript
// Node.js
const { request } = require('https');
const fs = require('fs');

// Load and convert image to base64
function getBase64Image(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
}

// Get API key from environment
const apiKey = process.env.MOONDREAM_API_KEY;
if (!apiKey) {
  throw new Error('Please set MOONDREAM_API_KEY environment variable');
}

// Prepare request data
const imageBase64 = getBase64Image('image.jpg');
const data = {
  image_url: `data:image/jpeg;base64,${imageBase64}`,
  length: 'long',
  stream: false
};

// Set up request options
const options = {
  hostname: 'playground2.servers.moondream.ai',
  path: '/v1/caption',
  method: 'POST',
  headers: {
    'X-Moondream-Auth': apiKey,
    'Content-Type': 'application/json'
  }
};

// Make request
const req = request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      console.log(result.result);
    } catch (error) {
      console.error('Error:', error);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

// Send request
req.write(JSON.stringify(data));
req.end();
```

```javascript
// Browser Fetch
async function getBase64Image(imagePath) {
  const response = await fetch(imagePath);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function captionImage() {
  try {
    const imageBase64 = await getBase64Image('image.jpg');
    
    const response = await fetch('https://api.moondream.ai/v1/caption', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Moondream-Auth': process.env.MOONDREAM_API_KEY
      },
      body: JSON.stringify({
        image_url: `data:image/jpeg;base64,${imageBase64}`,
        length: 'long',
        stream: false
      })
    });

    const data = await response.json();
    console.log(data.result);
  } catch (error) {
    console.error('Error:', error);
  }
}

captionImage();
```

```javascript
// Axios
import axios from 'axios';
import fs from 'fs';

async function captionImage() {
  try {
    // Read and convert image to base64
    const imageBuffer = fs.readFileSync('image.jpg');
    const imageBase64 = imageBuffer.toString('base64');

    const response = await axios({
      method: 'post',
      url: 'https://api.moondream.ai/v1/caption',
      headers: {
        'Content-Type': 'application/json',
        'X-Moondream-Auth': process.env.MOONDREAM_API_KEY
      },
      data: {
        image_url: `data:image/jpeg;base64,${imageBase64}`,
        length: 'long',
        stream: false
      }
    });

    console.log(response.data.result);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

captionImage();
```

For advanced options like streaming responses, show them separately after the basic examples.

### Components

- Use Callouts for important information
- Use Steps for sequential instructions
- Use Tabs for language-specific content
- Use proper spacing and indentation

## 🧪 Testing

1. **Local Testing**

   ~~~bash
   npm run dev
   ~~~

2. **Check Links**

   ~~~bash
   npm run check-links
   ~~~

3. **Build Test**

   ~~~bash
   npm run build
   ~~~

## 📋 Checklist Before Submitting

- [ ] Tested changes locally
- [ ] Updated relevant `_meta.tsx` files
- [ ] Added/updated code examples
- [ ] Checked spelling and grammar
- [ ] Verified all links work
- [ ] Followed style guide
- [ ] Added appropriate comments

## 🤝 Getting Help

- Join our [Discord community](https://discord.gg/moondream)
- Open an issue for questions
- Tag maintainers in comments

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.
