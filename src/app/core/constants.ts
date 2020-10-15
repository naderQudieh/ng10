
import { faCog, faBars, faRocket, faPowerOff, faUserCircle, faPlayCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faMediumM, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPlus,  faEdit,    faTrash,    faTimes,    faCaretUp,
    faCaretDown,    faExclamationTriangle,    faFilter,    faTasks,
    faCheck,    faSquare,    faLanguage,    faPaintBrush,    faLightbulb,    faWindowMaximize,
    faStream,    faBook
} from '@fortawesome/free-solid-svg-icons';

export const faIconscore: IconDefinition[]=[
    faCog,
    faBars,
    faRocket,
    faPowerOff,
    faUserCircle,
    faPlayCircle,
    faGithub,
    faMediumM,
    faTwitter,
    faInstagram,
    faYoutube
];

export const faIconsshared: IconDefinition[] = [
    faPlus,
    faEdit,
    faTrash,
    faTimes,
    faCaretUp,
    faCaretDown,
    faExclamationTriangle,
    faFilter,
    faTasks,
    faCheck,
    faSquare,
    faLanguage,
    faPaintBrush,
    faLightbulb,
    faWindowMaximize,
    faStream,
    faBook
];

export interface ValueLabel {
    value: string;
    label?: string;
}

export enum RegionTypes {
    RU = 'ru',
    EN = 'EN',
}
export enum Theme {
    LIGHT = 'light-theme',
    DARK = 'dark-theme',
}
