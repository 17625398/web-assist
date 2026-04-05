# Web Automation with OpenCLI and Page-Agent

Page Assist now integrates with OpenCLI and Page-Agent to provide powerful web automation capabilities. This allows AI agents to control web interfaces, execute complex browser operations, and interact with websites through natural language.

## Overview

The integration combines two powerful tools:

- **OpenCLI**: A CLI tool that turns any website, Electron app, or local CLI tool into a command-line interface. It provides browser automation capabilities like clicking, typing, extracting content, and taking screenshots.

- **Page-Agent**: A GUI agent that lives in your webpage, allowing you to control web interfaces with natural language commands.

## Setup

### OpenCLI Setup

1. Install OpenCLI globally:
   ```bash
   npm install -g @jackwener/opencli
   ```

2. Install the OpenCLI Browser Bridge extension:
   - Download the latest `opencli-extension.zip` from the [GitHub Releases](https://github.com/jackwener/opencli/releases) page
   - Unzip the file and open `chrome://extensions` in Chrome/Chromium
   - Enable Developer mode (top-right toggle)
   - Click "Load unpacked" and select the unzipped folder

3. Verify OpenCLI installation:
   ```bash
   opencli doctor
   ```

### Page-Agent Setup

Page-Agent is installed automatically as a dependency of Page Assist. You need to configure it with your LLM settings:

1. In Page Assist settings, navigate to the "Web Automation" section
2. Enable Page-Agent
3. Enter your LLM model details:
   - Model name (e.g., `qwen3.5-plus`)
   - API base URL (e.g., `https://dashscope.aliyuncs.com/compatible-mode/v1`)
   - API key

## Usage

### Web Automation Tools

Page Assist provides a unified set of web automation tools that combine the capabilities of OpenCLI and Page-Agent:

#### `web_automation_open`

Open a webpage in the browser.

**Parameters:**
- `url`: The URL of the webpage to open

**Example:**
```javascript
await agent.executeTool('web_automation_open', {
  url: 'https://www.example.com'
});
```

#### `web_automation_click`

Click an element on the webpage.

**Parameters:**
- `selector`: CSS selector of the element to click

**Example:**
```javascript
await agent.executeTool('web_automation_click', {
  selector: 'button.login'
});
```

#### `web_automation_type`

Type text into an input element.

**Parameters:**
- `selector`: CSS selector of the input element
- `text`: Text to type into the input

**Example:**
```javascript
await agent.executeTool('web_automation_type', {
  selector: 'input.username',
  text: 'user123'
});
```

#### `web_automation_get`

Extract content from an element.

**Parameters:**
- `selector`: CSS selector of the element to extract content from

**Example:**
```javascript
const result = await agent.executeTool('web_automation_get', {
  selector: 'div.product-title'
});
console.log(result); // Extracted content: "Product Name"
```

#### `web_automation_screenshot`

Take a screenshot of the current page.

**Parameters:**
- `path`: Path to save the screenshot (optional, defaults to "screenshot.png")

**Example:**
```javascript
await agent.executeTool('web_automation_screenshot', {
  path: 'page.png'
});
```

#### `web_automation_execute`

Execute a natural language command to control the webpage.

**Parameters:**
- `command`: Natural language command to execute
- `model`: LLM model name (optional, if not already initialized)
- `baseURL`: LLM API base URL (optional, if not already initialized)
- `apiKey`: LLM API key (optional, if not already initialized)

**Example:**
```javascript
const result = await agent.executeTool('web_automation_execute', {
  command: 'Click the login button and enter username "user123" and password "password123"'
});
console.log(result); // Web automation execution result: "Login form submitted successfully"
```

## Examples

### Example 1: Login to a website

```javascript
// Open the login page
await agent.executeTool('web_automation_open', {
  url: 'https://example.com/login'
});

// Enter username
await agent.executeTool('web_automation_type', {
  selector: 'input[name="username"]',
  text: 'user123'
});

// Enter password
await agent.executeTool('web_automation_type', {
  selector: 'input[name="password"]',
  text: 'password123'
});

// Click login button
await agent.executeTool('web_automation_click', {
  selector: 'button[type="submit"]'
});

// Extract welcome message
const welcomeMessage = await agent.executeTool('web_automation_get', {
  selector: 'div.welcome-message'
});

console.log(welcomeMessage);
```

### Example 2: Natural language control

```javascript
// Initialize Page-Agent (if not already done in settings)
await agent.executeTool('web_automation_execute', {
  command: 'Open GitHub and search for "page-assist" repository',
  model: 'qwen3.5-plus',
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  apiKey: 'YOUR_API_KEY'
});

// Take a screenshot of the search results
await agent.executeTool('web_automation_screenshot', {
  path: 'github-search-results.png'
});
```

## Troubleshooting

### OpenCLI Issues

- **Extension not connected**: Make sure the OpenCLI Browser Bridge extension is installed and enabled in Chrome/Chromium.
- **Daemon not running**: Run `opencli daemon start` to start the OpenCLI daemon.
- **Permission errors**: Make sure you have the necessary permissions to run OpenCLI commands.

### Page-Agent Issues

- **LLM connection failed**: Check your LLM model settings in Page Assist settings.
- **Execution failed**: Make sure your LLM API key is valid and has sufficient credits.
- **Command not understood**: Try rephrasing your natural language command to be more specific.

## Limitations

- OpenCLI requires Chrome or Chromium browser
- Page-Agent requires a valid LLM API configuration
- Some websites may have anti-automation measures that could block these tools
- Performance may vary depending on network speed and LLM response times

## Best Practices

- Use specific CSS selectors for more reliable element targeting
- Keep natural language commands clear and concise
- Use screenshots to verify the state of the webpage
- Test your automation workflows in a controlled environment before using them in production
- Respect website terms of service and robots.txt guidelines
