import * as React from "react";
import Table from "@/components/Table/Index";
import { GetListCompany } from '@/service/example/company.service';
import Button from "@/components/Button/Index";
import {Icon} from '@iconify/react';

export default function Home() {
    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "kode_saham",
            headerName: "Kode",
            flex: 1
        },
        {
            field: "nama",
            headerName: "Nama",
            flex: 1,
            searchable: true
        },  
        {
            field: "tanggal_listing",
            headerName: "Tanggal Listing",
            flex: 1
        },
        {
            field: "sektor_nama",
            headerName: "Sektor",
            flex: 1
        },
        {
            field: 'actions',
            headerName: 'ACTIONS',
            width: 180,
            editable: false,
            flex: 1,
            renderCell: () => (
                <>
                    <Button variant='text' color='primary' size='small'>
                        <Icon icon='uil:pen'/>
                    </Button>
                    <Button variant='text' color='error' size='small'>
                        <Icon icon='uil:trash-alt'/>
                    </Button>
                </>
            )
        }
    ]

    return (
        <div>
            <Table
                dataFetchService={GetListCompany}
                columns={columns}
                title="Perusahaan BEI"
                isStripped
                filters={[
                    { name: 'Kode Saham', field: 'kode_saham', type: 'dropdown-multiple', labelKey: 'kode_saham', dataFetchService: GetListCompany },
                    { name: 'Nama', field: 'nama', type: 'dropdown-multiple', labelKey: 'nama', dataFetchService: GetListCompany },
                    { name: 'Tanggal Listing', field: 'tanggal_listing', type: 'date' },
                ]}
            />
        </div>
    );
}
