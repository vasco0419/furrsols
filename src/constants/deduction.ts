// Hourly Attribute Deduction
const WINTER = {
    Winter: {
        Sleep: -1.0,
        Hunger: -1.0,
        Hygiene: -0.5,
        Fun: -0.5,
    },
    Spring: {
        Sleep: -1.0,
        Hunger: -1.0,
        Hygiene: -1.5,
        Fun: -0.5,
    },
    Summer: {
        Sleep: -1.5,
        Hunger: -1.0,
        Hygiene: -1.0,
        Fun: -1.5,
    },
    Autumn: {
        Sleep: -1.5,
        Hunger: -0.5,
        Hygiene: -1.0,
        Fun: -1.0,
    }
}

const SPRING = {
    Winter: {
        Sleep: -1.5,
        Hunger: -0.5,
        Hygiene: -1.0,
        Fun: -1.0,
    },
    Spring: {
        Sleep: -1.0,
        Hunger: -0.5,
        Hygiene: -0.5,
        Fun: -1.0,
    },
    Summer: {
        Sleep: -1.0,
        Hunger: -1.5,
        Hygiene: -0.5,
        Fun: -1.0,
    },
    Autumn: {
        Sleep: -1.5,
        Hunger: -1.0,
        Hygiene: -1.0,
        Fun: -1.5,
    }
}

const SUMMER = {
    Winter: {
        Sleep: -1.0,
        Hunger: -1.5,
        Hygiene: -1.5,
        Fun: -1.0,
    },
    Spring: {
        Sleep: -1.5,
        Hunger: -1.0,
        Hygiene: -1.0,
        Fun: -0.5,
    },
    Summer: {
        Sleep: -0.5,
        Hunger: -1.0,
        Hygiene: -1.0,
        Fun: -0.5,
    },
    Autumn: {
        Sleep: -1.0,
        Hunger: -0.5,
        Hygiene: -1.5,
        Fun: -1.0,
    }
}

const AUTUMN = {
    Winter: {
        Sleep: -1.0,
        Hunger: -1.0,
        Hygiene: -0.5,
        Fun: -1.5,
    },
    Spring: {
        Sleep: -1.0,
        Hunger: -1.5,
        Hygiene: -1.5,
        Fun: -1.0,
    },
    Summer: {
        Sleep: -0.5,
        Hunger: -1.0,
        Hygiene: -1.0,
        Fun: -1.5,
    },
    Autumn: {
        Sleep: -0.5,
        Hunger: -1.0,
        Hygiene: -1.0,
        Fun: -0.5,
    }
}

export { WINTER, SPRING, SUMMER, AUTUMN }