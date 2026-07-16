export interface Project {
    name: string;
    url: string;
    description: string;
    archived: boolean;
    image?: string;
}

import farmstoreScreenshot from "/images/screenshots/farmstoress.png";

export const projects: Project[] = [
    {
        name: "Wilco Farmstores",
        url: "https://farmstore.com",
        description: "A headless e-commerce platform serving a 45,000+ SKU catalog across 24 retail locations in 3 states. Handling ~9,000 orders/month through a custom event-driven fulfillment pipeline, a three-provider checkout experience, and a companion admin platform.",
        archived: false,
        image: farmstoreScreenshot,
    },
    {
        name: "_music",
        url: "https://blankspacemusic.com",
        description: "An open source project created with the intention of letting artists host and control their own music library. Features code and no-code tutorial options, data export tool, and further personalization suggestions",
        archived: false,
    },
    {
        name: "TAOP",
        url: "https://taop-demo.vercel.app",
        description: `My in progress "build in public" game built combining a JavaScript game engine (Phaser) with full Vue UI components. Check back for more updates!`,
        archived: false,
    },
    {
        name: "Pixel Paint",
        url: "/",
        description: "A browser-based pixel art editor featuring a free-paint canvas, save, download, or publish options. Public creations can also be used as paint-by-number templates.",
        archived: true,
    },
];