# Moondream Pip Library Style Guide

> This guide serves as the canonical reference for Moondream pip library syntax, model choices, and usage patterns. It is primarily intended for maintainers of the documentation and examples.

## Installation

### Version Specification
```bash
pip install moondream  # Always specify version for reproducibility
```

### Model Downloads
Official download URLs (with `?download=true` parameter):

#### Latest Models (client branch)
```bash
# INT8 (recommended)
wget "https://huggingface.co/vikhyatk/moondream2/resolve/client/moondream-latest-int8.bin.gz?download=true" -O - | gunzip > moondream-latest-int8.bin

# FP16 (full precision)
wget "https://huggingface.co/vikhyatk/moondream2/resolve/client/moondream-latest-f16.bin.gz?download=true" -O - | gunzip > moondream-latest-f16.bin

# INT4 (resource constrained)
wget "https://huggingface.co/vikhyatk/moondream2/resolve/client/moondream-latest-int4.bin.gz?download=true" -O - | gunzip > moondream-latest-int4.bin
```

#### 0.5B Models (onnx branch)
```bash
# INT8 (613 MB)
wget "https://huggingface.co/vikhyatk/moondream2/resolve/onnx/moondream-0_5b-int8.bin.gz?download=true" -O - | gunzip > moondream-0_5b-int8.bin

# INT4 (479 MB)
wget "https://huggingface.co/vikhyatk/moondream2/resolve/onnx/moondream-0_5b-int4.bin.gz?download=true" -O - | gunzip > moondream-0_5b-int4.bin
```

## Standard Library Usage

### Import Pattern
```python
import moondream as md  # Standard import alias
from PIL import Image   # Required for image handling
```

### Model Initialization
```python
# Always requires model path
model = md.vl("moondream-latest-int8.bin")  # No default path
```

### Core Functions

#### Image Loading & Encoding
```python
# Image loading
image = Image.open("path/to/image.jpg")

# Image encoding (optional but recommended for multiple queries)
encoded_image = model.encode_image(image)
```

#### Captioning
```python
# Standard caption
caption = model.caption(encoded_image)
print(caption["caption"])

# Streaming caption
for token in model.caption(encoded_image, stream=True)["caption"]:
    print(token, end="", flush=True)
```

#### Question Answering
```python
# Standard query
answer = model.query(encoded_image, question)["answer"]

# Streaming query
for token in model.query(encoded_image, question, stream=True)["answer"]:
    print(token, end="", flush=True)
```

#### Object Detection (Coming Soon)
```python
# Detect objects (future API)
detections = model.detect(image, "cat eyes")
```

#### Visual Pointing (Coming Soon)
```python
# Point at objects (future API)
response = model.point(image, "Where is the cat looking?")
```

> **Note:** Object detection and visual pointing are upcoming features. Try them now at [moondream.ai/playground](https://moondream.ai/playground).

## Model Variants Reference

### Standard Names and Sizes
```python
MODEL_VARIANTS = {
    # Latest Models
    'int8': {
        'filename': 'moondream-latest-int8.bin',
        'size_compressed': '1.83 GB',
        'size_uncompressed': '2.09 GB',
        'url': 'https://huggingface.co/vikhyatk/moondream2/resolve/client/moondream-latest-int8.bin.gz?download=true',
        'description': 'Recommended for most use cases'
    },
    'fp16': {
        'filename': 'moondream-latest-f16.bin',
        'size_compressed': '2.88 GB',
        'size_uncompressed': '3.74 GB',
        'url': 'https://huggingface.co/vikhyatk/moondream2/resolve/client/moondream-latest-f16.bin.gz?download=true',
        'description': 'Full precision, maximum quality'
    },
    'int4': {
        'filename': 'moondream-latest-int4.bin',
        'size_compressed': '1.31 GB',
        'size_uncompressed': '1.52 GB',
        'url': 'https://huggingface.co/vikhyatk/moondream2/resolve/client/moondream-latest-int4.bin.gz?download=true',
        'description': 'Resource-constrained environments'
    },
    # 0.5B Models
    '0.5b-int8': {
        'filename': 'moondream-0_5b-int8.bin',
        'size_compressed': '479 MB',
        'size_uncompressed': '613 MB',
        'url': 'https://huggingface.co/vikhyatk/moondream2/resolve/onnx/moondream-0_5b-int8.bin.gz?download=true',
        'description': 'Lightweight INT8 model'
    },
    '0.5b-int4': {
        'filename': 'moondream-0_5b-int4.bin',
        'size_compressed': '375 MB',
        'size_uncompressed': '479 MB',
        'url': 'https://huggingface.co/vikhyatk/moondream2/resolve/onnx/moondream-0_5b-int4.bin.gz?download=true',
        'description': 'Lightweight INT4 model'
    }
}
```

## API Reference

### Return Types
All model functions return dictionaries with specific keys:
~~~python
# Caption
{
    "caption": str  # The generated caption
}

# Query
{
    "answer": str   # The answer to the question
}
~~~

### Streaming Interface
Streaming functions yield tokens as strings:
~~~python
for token in model.caption(encoded_image, stream=True)["caption"]:
    # token is a string
    print(token, end="", flush=True)
~~~

## Backend Support & Limitations

- ✅ Optimized for CPU inference
- ❌ Not recommended for CUDA/MPS backends
- ❌ Not recommended for Mac M1/M2/M3 chips with GPU
- ⚠️ No default model paths
- ⚠️ No automatic model downloads

## Common Implementation Pitfalls

1. **Model Initialization**
   ~~~python
   # INCORRECT
   model = md.vl()  # Missing required model_path
   
   # CORRECT
   model = md.vl("path/to/model.bin")
   ~~~

2. **Image Encoding Efficiency**
   ~~~python
   # INEFFICIENT (for multiple queries)
   answer1 = model.query(image, question1)
   answer2 = model.query(image, question2)
   
   # EFFICIENT
   encoded = model.encode_image(image)
   answer1 = model.query(encoded, question1)
   answer2 = model.query(encoded, question2)
   ~~~

3. **Result Access**
   ~~~python
   # INCORRECT
   caption = model.caption(encoded_image)
   print(caption)  # Prints entire dictionary
   
   # CORRECT
   caption = model.caption(encoded_image)
   print(caption["caption"])  # Prints just the caption text
   ~~~

## Documentation Standards

### Version Tracking
~~~python
CURRENT_VERSION = "0.0.2"
SUPPORTED_PYTHON = "3.8+"
SUPPORTED_PLATFORMS = ["Linux", "Windows", "macOS"]
~~~

### Required Documentation Elements
1. Version number specification
2. Model path requirement
3. Dictionary key access
4. Streaming parameters (`end=""`, `flush=True`)
5. Backend limitations
6. Model variant details
7. PIL Image usage

### Example Template
~~~python
"""
Example Title

Description of what this example demonstrates.

Requirements:
- moondream=={CURRENT_VERSION}
- PIL
- [other dependencies]

Model Requirements:
- Disk Space: {MODEL_SIZE}
- Memory: {MEMORY_REQUIREMENT}
"""

import moondream as md
from PIL import Image

# Example code...
~~~

## Testing & Validation

### Basic Functionality Test
~~~python
import moondream as md
from PIL import Image

def test_basic_functionality():
    # Test initialization
    model = md.vl("moondream-latest-int8.bin")
    
    # Test image loading
    image = Image.open("test.jpg")
    encoded = model.encode_image(image)
    
    # Test captioning
    caption = model.caption(encoded)
    assert isinstance(caption["caption"], str)
    
    # Test streaming
    for token in model.caption(encoded, stream=True)["caption"]:
        assert isinstance(token, str)
    
    # Test Q&A
    answer = model.query(encoded, "Test question?")
    assert isinstance(answer["answer"], str)

    return "All tests passed"
~~~

### Documentation Checklist
Before committing documentation changes:
- [ ] Correct version number
- [ ] Model path in initialization
- [ ] Proper dictionary access
- [ ] Streaming parameters
- [ ] Backend limitations
- [ ] Model sizes and URLs
- [ ] PIL Image usage
- [ ] Example code tested
- [ ] All code blocks are syntax-highlighted
- [ ] No references to unavailable features

## Version History

### 0.0.2 (Current)
- Initial public release
- CPU-optimized inference
- Streaming support
- Three model variants (INT8, FP16, INT4)
- No automatic model downloads
- Required model path specification

## Maintainer Notes

### Key Files to Monitor
- `moondream-pip.md` (this guide)
- `getting-started.mdx`
- `quick-start.mdx`
- Example files in `/cookbook/`

### Documentation Update Process
1. Update this guide first
2. Update version numbers across all files
3. Test all example code
4. Update model sizes and URLs if changed
5. Verify backend support statements
6. Update troubleshooting sections

### Common Support Issues
- Model path not specified
- GPU acceleration attempts
- Memory issues with large models
- Streaming output formatting
- Dictionary key access errors