export interface BattlePass {
    displayInfo: Display;
    seasonDates: SeasonDates;
    videos: Video[];
    rewards: Reward[];
    arr: ArrData[]
}

export interface ArrData {
    page: number,
    data: Reward[]
}
export interface PagesBattlePass {
    [key: number]: Reward[]

}
export interface Display {
    chapter: Chapter;
    season: Season;
    chapterSeason: ChapterSeason;
    battlepassName?: BattlepassName;
}


export interface Reward {
    offerId: string;
    tier: number;
    page: number;
    battlepass: BattlepassEnum;
    quantity: number;
    price: Price;
    rewardsNeededForUnlock: number;
    levelsNeededForUnlock: number;
    item: Item;
    bg?: string

}

export interface Item {
    id: string;
    type: Rarity;
    name: string;
    description: string;
    rarity: Rarity;
    series: Rarity | null;
    price: number;
    added: Added;
    builtInEmote: null;
    copyrightedAudio: boolean;
    upcoming: boolean;
    reactive: boolean;
    releaseDate: null;
    lastAppearance: null;
    interest: number;
    images: Images;
    juno: Juno;
    video: null;
    audio: null;
    path: null | string;
    gameplayTags: string[];
    apiTags: string[];
    searchTags: any[];
    battlepass: BattlepassClass | null;
    set: Set | null;
    introduction: Introduction | null;
    displayAssets: any[];
    shopHistory: null;
    styles: any[];
    previewVideos: any[];
    grants: any[];
    grantedBy: any[];
}

export interface Added {
    date: Date;
    version: string;
}

export interface BattlepassClass {
    season: number;
    tier: number;
    page: number;
    type: BattlepassEnum;
    displayText: Display;
    battlePassName: BattlepassName;
}

export interface Images {
    icon: string;
    featured: null | string;
    background: string;
    icon_background: string;
    full_background: string;
}

export interface Introduction {
    chapter: Chapter;
    season: Season;
    text: Text;
}


export interface Juno {
    icon: null;
}

export interface Rarity {
    id: string;
    name: string;
}

export interface Set {
    id: ID;
    name: ID;
    partOf: PartOf;
}


export interface Price {
    type: Type;
    amount: number;
}


export interface SeasonDates {
    begin: Date;
    end: Date;
}

export interface Video {
    lang: string;
    type: string;
    url: string;
}
