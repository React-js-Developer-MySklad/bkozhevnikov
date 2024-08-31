
export type Counterparty = {
    id: number;
    name: string;
    inn?: string;
    address?: string;
    kpp?: string;
}

type hasMessage = {
    message?: string;
}

type ValidationResult = {
    name?: hasMessage;
    inn?: hasMessage;
    address?: hasMessage;
    kpp?: hasMessage;
}

export type TableConfiguration = {
    columnNames: string[];
    valueGetter: (columnName: string, value: Counterparty) => string;
    valueSetter: (columnName: string, c: Counterparty, value: string) => Counterparty;
    validation?: (counterparty: Counterparty) => ValidationResult | undefined;
}

const regexForLiteralAndNumber = /^[A-Za-z0-9]+$/;

export const defaultConfiguration: TableConfiguration = {
    columnNames: ['name', 'inn', 'address', 'kpp'],
    valueGetter: (columnName: string, counterparty: Counterparty) => {
        if (counterparty) {
            switch (columnName) {
                case 'name':
                    return counterparty.name;
                case 'inn':
                    return counterparty.inn;
                case 'address':
                    return counterparty.address;
                case 'kpp':
                    return counterparty.kpp;
            }
        }
        return '';
    },
    valueSetter: (columnName: string, counterparty: Counterparty, value) => {
        switch (columnName) {
            case 'name':
                return { ...counterparty, 'name': value }
            case 'inn':
                return { ...counterparty, 'inn': value }
            case 'address':
                return { ...counterparty, 'address': value }
            case 'kpp':
                return { ...counterparty, 'kpp': value }
        }
        return { ...counterparty };
    },

    validation: (c: Counterparty) => {
        let hasError: boolean = false;
        let validationResult: ValidationResult = {}
        if (!c.name || c.name.trim().length === 0) {
            validationResult = { ...validationResult, name: { message: "Поле должно быть заполнено" } }
            hasError = true;
        }

        if (c.inn) {
            if (!regexForLiteralAndNumber.test(c.inn)) {
                validationResult = { ...validationResult, inn: { message: "Поле может содердать только цифры и латинские буквы " } }
                hasError = true;
            } else if (c.inn.length != 11) {
                validationResult = { ...validationResult, inn: { message: "Поле должно содержать 11 символов " } }
                hasError = true;
            }
        } else {
            validationResult = { ...validationResult, inn: { message: "Поле должно быть заполнено" } }
            hasError = true;
        }
        if (c.kpp) {
            if (!regexForLiteralAndNumber.test(c.kpp)) {
                validationResult = { ...validationResult, kpp: { message: "Поле может содердать только цифры и латинские буквы " } }
                hasError = true;
            } else if (c.kpp.length != 9) {
                validationResult = { ...validationResult, kpp: { message: "Поле должно содержать 9 символов " } }
                hasError = true;
            }
        } else {
            validationResult = { ...validationResult, kpp: { message: "Поле должно быть заполнено" } }
            hasError = true;
        }
        if (hasError) {
            return validationResult;
        }
        return undefined;
    }
}