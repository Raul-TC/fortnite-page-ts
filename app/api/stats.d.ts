export interface URLStats {
    status: number;
    data: {
        account: Account;
        battlePass: BattlePass;
        image: null;
        stats: Stats;
    };
}

export interface URLStatsID {
    result: boolean;
    name: string;
    account: {
        season: number;
        level: number;
        process_pct: number;
    };
    accountLevelHistory: Account[];
    global_stats: GlobalStats;
    per_input: PerInput;
    seasons_available: number[];
}

export interface Account {
    id: string;
    name: string;
}

export interface BattlePass {
    level: number;
    progress: number;
}

export interface Stats {
    all: All;
}

export interface SeasonStats {
    all: All;
}

export interface All {
    // overall: GameMode;
    solo: GameMode;
    duo: GameMode;
    trio?: {
        placetop1: number,
        kills: number,
        placetop3: number,
        placetop6: number,
        deaths: number,
        kd: number,
        matchesplayed: number,
        winrate: number,
        minutesplayed: number
    };
    squad: GameMode;
    // ltm: number;
}

export interface GameMode {
    score: number,
    scorePerMin: number,
    scorePerMatch: number,
    wins: number,
    top3: number,
    top5: number,
    top6: number,
    top10: number,
    top12: number,
    top25: number,
    kills: number,
    killsPerMin: number,
    killsPerMatch: number,
    deaths: number,
    kd: number,
    matches: number,
    winRate: number,
    minutesPlayed: number,
    playersOutlived: number,
    lastModified: string
}
export interface Ltm {
    score: number;
    scorePerMin: number;
    scorePerMatch: number;
    wins: number;
    kills: number;
    killsPerMin: number;
    killsPerMatch: number;
    deaths: number;
    kd: number;
    matches: number;
    winRate: number;
    minutesPlayed: number;
    playersOutlived: number;
    lastModified: Date;
}

export interface GlobalStats {
    solo: { [key: string]: number };
    squad: { [key: string]: number };
    duo: { [key: string]: number };
    trio: {
        placetop1: number,
        kills: number,
        placetop3: number,
        placetop6: number,
        deaths: number,
        kd: number,
        matchesplayed: number,
        winrate: number,
        minutesplayed: number
    };
}

export interface PerInput {
    gamepad: GlobalStats;
    keyboardmouse: Keyboardmouse;
    touch: GlobalStats;
}

export interface Keyboardmouse {
    solo: { [key: string]: number };
    squad: { [key: string]: number };
}

interface ExtendedLifetime extends All {
    trio?: Ltm | null;
}

export interface CustomStats {
    accountLevelHistory?: URLStatsID['accountLevelHistory'],
    stats?: {
        allSeason: CombinedStats,
        season: All
    },
    account?: Account,
    battlePass?: BattlePass,
    status?: number,
    stack?: boolean
}

interface CombinedStats {
    solo: GameMode;
    duo: GameMode;
    trio: {
        placetop1: number,
        kills: number,
        placetop3: number,
        placetop6: number,
        deaths: number,
        kd: number,
        matchesplayed: number,
        winrate: number,
        minutesplayed: number
    };
    squad: GameMode;
}