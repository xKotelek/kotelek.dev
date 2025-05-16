import packageJson from "../package.json";

export function getVersions() {
    const deps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
    };

    function cleanVersion(version) {
        if (!version) return "N/A";
        version = version.replace(/^[\^~]/, "");

        const parts = version.split(".");
        if (parts.length === 1) return `${parts[0]}.0`;
        return `${parts[0]}.${parts[1]}`;
    }

    return {
        next: cleanVersion(deps.next),
        tailwind: cleanVersion(deps["tailwindcss"]),
    };
}
