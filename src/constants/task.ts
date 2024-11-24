const TASK = {
    FEED: {
        Sleep: -0.15,
        Hunger: 5.00,
        Hygiene: -0.15,
        Fun: -0.10,
    },
    REST: {
        Sleep: 5.00,
        Hunger: -0.15,
        Hygiene: -0.10,
        Fun: -0.15,
    },
    GROOM: {
        Sleep: -0.10,
        Hunger: -0.15,
        Hygiene: 5.00,
        Fun: -0.15,
    },
    PLAY: {
        Sleep: -0.15,
        Hunger: -0.10,
        Hygiene: -0.15,
        Fun: +5.00,
    }
}

export default TASK