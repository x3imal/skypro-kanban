export const light = {
    colors: {
        bg: "#EAEEF6",
        white: "#FFFFFF",
        text: "#000000",
        muted: "#94A6BE",
        brand: "#565EEF",
        hoverBrand: "#33399b",

        border: "rgba(148,166,190,0.30)",
        inputBg: "#FFFFFF",
        inputBorder: "rgba(148,166,190,0.35)",
        placeholder: "#94A6BE",
        overlay: "rgba(0,0,0,0.40)",
        surface2: "#F4F6FA",

        badge: {
            webdesign:  { bg: "#FFE4C2", fg: "#FF6D00" },
            research:   { bg: "#B4FDD1", fg: "#06B16E" },
            copywriting:{ bg: "#E9D4FF", fg: "#9A48F1" },
            gray:       { bg: "#94A6BE", fg: "#FFFFFF" },
        },
    },
    spacing: { cardGap: "10px" },
    radius: { sm: "4px", md: "8px", lg: "10px", pill: "24px" },
    shadow: { card: "0 4px 67px -12px rgba(0,0,0,.13)" },
    breakpoints: { md: "1200px", sm: "660px", xs: "495px", xxs: "375px" },
};

export const dark = {
    colors: {
        bg: "#1A1D23",
        white: "#0E1117",
        text: "#E6EDF3",
        muted: "#A0AEC0",
        brand: "#6C7CFF",
        hoverBrand: "#505BDA",

        border: "rgba(148,166,190,0.18)",
        inputBg: "#0E1117",
        inputBorder: "rgba(148,166,190,0.22)",
        placeholder: "#8B9BB2",
        overlay: "rgba(0,0,0,0.40)",
        surface2: "#141923",

        badge: {
            webdesign:  { bg: "#FF6D00", fg: "#FFE4C2" },
            research:   { bg: "#B4FDD1", fg: "#06B16E" },
            copywriting:{ bg: "#9A48F1", fg: "#E9D4FF" },
            gray:       { bg: "#94A6BE", fg: "#FFFFFF" },
        },
    },
    spacing: { cardGap: "10px" },
    radius: { sm: "4px", md: "8px", lg: "10px", pill: "24px" },
    shadow: { card: "0 4px 67px -12px rgba(0,0,0,.30)" },
    breakpoints: { md: "1200px", sm: "660px", xs: "495px", xxs: "375px" },
};

export const themes = { light, dark };