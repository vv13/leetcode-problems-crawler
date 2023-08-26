import { InvalidArgumentError, program } from 'commander'
import config from './config'

export function parseIds(idStr?: string) {
    if (!idStr) {
        const msg = 'Ids should not be empty'
        console.log(msg)
        throw new InvalidArgumentError(msg)
    }
    const ids = []
    if (idStr.includes('-')) {
        const [start, end] = idStr.split('-').map(idnumber => Number(idnumber))
        for (let i = start; i <= end; i++) {
            ids.push(i)
        }
    } else if (idStr.includes(',')) {
        ids.push(...idStr.split(',').map(Number))
    } else {
        ids.push(Number(idStr))
    }
    return ids
}

export function parseI18ns(i18nStr?: string) {
    if (!['en', 'cn'].includes(i18nStr)) {
        const msg = 'Invalid i18n parameter input'
        console.log(msg)
        throw new InvalidArgumentError(msg)
    }

    return i18nStr
}

export function parseLang(lang?: string) {
    const langStrs = [];
    if (langStr.includes(',')) {
        langStrs.push(...langStr.split(','));
    }
    else {
        langStrs.push(langStr);
    }
    const allowedLangs = Object.keys(config.langSlugMap)
    const langs = langStrs.map(lang => {
        if (allowedLangs.includes(lang)) {
            return lang;
        }
        else {
            const msg = 'Invalid lang parameter value';
            console.log(msg);
            throw new InvalidArgumentError(msg);
        }
    });
    return langs;
}
