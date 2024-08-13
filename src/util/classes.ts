
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
}

export const defaultConfiguration: TableConfiguration = {
    columnNames: ['name', 'inn', 'address', 'kpp'],
    valueGetter: (columnName: string, counterparty: Counterparty) => {
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
        return '';
    }
}

export const defaultData: Counterparty[] = [
    {id: 1, name: 'name1', inn: 'inn1', address: 'address1', kpp: 'kpp1'},
    {id: 2, name: 'name2', inn: 'inn2', address: 'address2', kpp: 'kpp2'},
    {id: 3, name: 'name3', inn: 'inn3', address: 'address3', kpp: 'kpp3'},
    {id: 4, name: 'name4', inn: 'inn4', address: 'address4', kpp: 'kpp4'},
    {id: 5, name: 'name5', inn: 'inn5', address: 'address5', kpp: 'kpp5'},
    {id: 6, name: 'name6', inn: 'inn6', address: 'address6', kpp: 'kpp6'},
]