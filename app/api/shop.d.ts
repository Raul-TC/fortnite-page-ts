export interface Shop {
    result: boolean;
    fullShop: boolean;
    lastUpdate: LastUpdate;
    currentRotation: CurrentRotation;
    nextRotation: null;
    carousel: null;
    specialOfferVideo: null;
    customBackground: null;
    shop: ShopElement[];
}

export interface Categories {
    [key: string]: ShopElement[]; // O ajusta este tipo según tus necesidades

}

export interface ShopArray {
    section: string,
    data: ShopElement[]
}
export interface CurrentRotation {
    "SummerShop1.98": Date;
    "StarWarsLegoDecor.98": Date;
    "JamTracks.97": Date;
    "JamTracks.98": Date;
    "JamTracks.99": Date;
    "GearForFestival.99": Date;
    "Metallica1.97": Date;
    "Metallica1.96": Date;
    "SignatureStyle.99": Date;
    "SignatureStyle.98": Date;
    "SignatureStyle.96": Date;
    "Icons.98": Date;
    "SummerShop1.96": Date;
    "Lighthouse.98": Date;
    "SummerShop1.97": Date;
    "SignatureStyle.97": Date;
    "Metallica1.98": Date;
    "Metallica1.99": Date;
    "Icons.97": Date;
    "StartYourEngines.99": Date;
    "NickEh30.99": Date;
    "StartYourEngines.LamborghiniHuracanSTO.99": Date;
    "AnarchyAcres.98": Date;
    "Icons.99": Date;
    "Lighthouse.99": Date;
    "AnarchyAcres.99": Date;
    "StarWarsLegoDecor.99": Date;
    "SummerShop1.99": Date;
    "NickEh30.98": Date;
}

export interface LastUpdate {
    date: Date;
    uid: string;
}

export interface ShopElement {
    mainId: string;
    displayName: string;
    displayDescription: string;
    displayType: DisplayType;
    mainType: MainType;
    offerId: string;
    devName: string;
    offerDates: OfferDates;
    displayAssets: DisplayAsset[];
    firstReleaseDate: Date;
    previousReleaseDate: Date | null;
    giftAllowed: boolean;
    buyAllowed: boolean;
    price: Price;
    rarity: Rarity;
    series: Rarity | null;
    banner: Banner | null;
    offerTag: OfferTag | null;
    granted: Granted[];
    priority: number;
    section: Section;
    groupIndex: number;
    storeName: StoreName;
    tileSize: TileSize;
    categories: any[];
    bg: string,
    bgDefault: string,
}

export interface Banner {
    id: string;
    name: string;
    intensity: Intensity;
}

export enum Intensity {
    High = "High",
    Low = "Low",
}

export interface DisplayAsset {
    displayAsset: string;
    materialInstance: string;
    primaryMode: string;
    url: string;
    flipbook?: null;
    background_texture?: null | string;
    background: string;
    full_background: string;
}

export enum PrimaryMode {
    BattleRoyale = "BattleRoyale",
    DelMar = "DelMar",
    Juno = "Juno",
    Max = "MAX",
}

export enum DisplayType {
    AccesorioMochilero = "Accesorio mochilero",
    AlaDelta = "Ala delta",
    Envoltorio = "Envoltorio",
    Gesto = "Gesto",
    LoteDe4ObjetoS = "Lote de 4 objeto(s)",
    LoteDe7ObjetoS = "Lote de 7 objeto(s)",
    LoteDeObjetos = "Lote de objetos",
    Pico = "Pico",
    Traje = "Traje",
}

export interface Granted {
    id: string;
    type: Rarity;
    name: string;
    description: string;
    rarity: Rarity;
    series: Rarity | null;
    images: Images;
    juno: Juno;
    video: null;
    audio: null;
    gameplayTags: string[];
    set: Set | null;
}

export interface Images {
    icon: null | string;
    featured: null | string;
    background: null | string;
    icon_background: null | string;
    full_background: null | string;
}

export interface Juno {
    icon: null | string;
}

export interface Rarity {
    id: MainType;
    name: RarityName;
}

export enum MainType {
    Backpack = "backpack",
    BuildingProp = "building_prop",
    BuildingSet = "building_set",
    Bundle = "bundle",
    CUBESeries = "CUBESeries",
    Common = "Common",
    Contrail = "contrail",
    CreatorCollabSeries = "CreatorCollabSeries",
    Emote = "emote",
    Epic = "Epic",
    Glider = "glider",
    Legendary = "Legendary",
    Loadingscreen = "loadingscreen",
    Music = "music",
    Outfit = "outfit",
    Pickaxe = "pickaxe",
    Rare = "Rare",
    SeriesLamborghini = "Series_Lamborghini",
    SparksDrum = "sparks_drum",
    SparksKeyboard = "sparks_keyboard",
    SparksMicrophone = "sparks_microphone",
    SparksSong = "sparks_song",
    Uncommon = "Uncommon",
    VehicleBody = "vehicle_body",
    VehicleCosmeticvariant = "vehicle_cosmeticvariant",
    VehicleSkin = "vehicle_skin",
    VehicleWheel = "vehicle_wheel",
    Wrap = "wrap",
}

export enum RarityName {
    AccesorioMochilero = "Accesorio mochilero",
    AlaDelta = "Ala delta",
    Batería = "Batería",
    Calcomanía = "Calcomanía",
    Común = "COMÚN",
    Decoración = "Decoración",
    Envoltorio = "Envoltorio",
    Estela = "Estela",
    Estilo = "Estilo",
    Gesto = "Gesto",
    Keytar = "Keytar",
    KitDeLEGO = "Kit de LEGO®",
    Legendaria = "LEGENDARIA",
    Micrófono = "Micrófono",
    Música = "Música",
    PantallaDeCarga = "Pantalla de carga",
    PerfecciónAReacciónQueJuegaEnSuPropiaLiga = "Perfección a reacción que juega en su propia liga.",
    Pico = "Pico",
    PistaDeImprovisación = "Pista de improvisación",
    PocoComún = "POCO COMÚN",
    Rara = "RARA",
    Rueda = "Rueda",
    SerieDeÍdolos = "Serie de ídolos",
    SerieLamborghini = "SERIE LAMBORGHINI",
    SerieOscura = "SERIE OSCURA",
    Traje = "Traje",
    Épico = "Épico",
}

export interface Set {
    id: string;
    name: string;
    partOf: string;
}

export interface OfferDates {
    in: Date;
    out: Date;
}

export interface OfferTag {
    id: string;
    text: string;
}

export interface Price {
    regularPrice: number;
    finalPrice: number;
    floorPrice: number;
}

export interface Section {
    name: string;
    category: Category | boolean;
}

export enum Category {
    ConstruyeConKitsDeLEGO = "Construye con kits de LEGO®",
    Destacados = "Destacados",
    OriginalesMagistrales = "Originales magistrales",
    SubeAlEscenario = "Sube al escenario",
    SéElCentroDeAtención = "Sé el centro de atención",
    TiendaDeVerano = "Tienda de verano",
}

// export enum SectionName {
//     [key: string | boolean]: ShopElement
// }

export enum StoreName {
    BRDailyStorefront = "BRDailyStorefront",
    BRWeeklyStorefront = "BRWeeklyStorefront",
}

export enum TileSize {
    Size1_X1 = "Size_1_x_1",
    Size1_X2 = "Size_1_x_2",
    Size2_X2 = "Size_2_x_2",
    Size3_X2 = "Size_3_x_2",
    Size5_X2 = "Size_5_x_2",
}
