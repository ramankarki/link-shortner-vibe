---
name: create-instructions
description: Use this prompt to generate new custom instructions file.
agent: instruction-generator
---

Take the information below and generate a [NAME].instructions.md file in the /.github/instructions directory. Generate an appropriate lowered case name for the [NAME] placeholder based on the generated content. If a .instructions.md file is provided, use that, otherwise generate an appropriate filename based on the generated content. Make sure the instructions are concise and not too long. If no information is provided, prompt the user to provide necessary details about the layer of architecture or coding standards to document.
The .instructions.md file should have front matter with description property that informs copilot of when to use this set of instructions.
