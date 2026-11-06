try {
    if (navigator.modelContext && typeof navigator.modelContext.registerTool === 'function') {
        navigator.modelContext.registerTool({
            name: "verify_identity",
            description: "Verifies the identity of a citizen in the government database and retrieves their CURP file.",
            inputSchema: {
                type: "object",
                properties: {
                    first_name: { type: "string", description: "The citizen's first name." },
                    last_name: { type: "string", description: "The citizen's last name." },
                    curp: { type: "string", description: "The citizen's CURP code." },
                    rfc: { type: "string", description: "The citizen's RFC." },
                    nss: { type: "string", description: "The citizen's social security number (NSS)." },
                    address: { type: "string", description: "The citizen's address." },
                    phone: { type: "string", description: "The citizen's phone number." },
                    email: { type: "string", description: "The citizen's email address." }
                },
                required: ["first_name", "last_name", "curp", "rfc", "nss", "address", "phone", "email"]
            },
            execute: async (args) => {
                const response = await fetch('/api/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(args)
                });
                const result = await response.json();
                return {
                    content: [{ type: "text", text: result.message }]
                };
            }
        });
    }
} catch (e) {
}
