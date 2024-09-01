
export type Counterparty = {
    id: number;
    name: string;
    inn?: string;
    address?: string;
    kpp?: string;
}

export type TableConfiguration = {
    columnNames: string[];
    valueGetter: (columnName: string, value: Counterparty) => string;
    valueSetter: (columnName: string, c: Counterparty, value: string) => Counterparty;
}

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
                return {...counterparty, 'name': value}
            case 'inn':
                return {...counterparty, 'inn': value}
            case 'address':
                return {...counterparty, 'address': value}
            case 'kpp':
                return {...counterparty, 'kpp': value}
        }
        return {...counterparty};
    }
}