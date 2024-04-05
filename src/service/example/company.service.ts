import {useQuery} from '@tanstack/react-query'
import {type PropsTable} from '@/components/Table/Table.type'
import {PREFIX_KEY} from '@/constant/common'
import client from '@/client/index'

type Sector = {
    nama: string
}

type Company = {
    id: string
    kode_saham: string
    nama: string
    tanggal_listing: string
    sektor_id?: Sector
    sektor_nama?: string
}

type GetListCompanyResponse = {
    data: Company[]
    meta: {
        filter_count: number
    }
}

export const GetListCompany: PropsTable['dataFetchService'] = params => {
    const queryParams = {
        ...params,
        fields: ['id', 'kode_saham', 'nama', 'tanggal_listing', 'sektor_id.nama']
    }

    return useQuery({
        queryKey: [PREFIX_KEY.GET, 'BEI', queryParams],
        async queryFn() {
            const response = await client.api.get<GetListCompanyResponse>('/items/perusahaan_bei', {
                params: queryParams
            })
            
            return response.data
        },
        select(data) {
            const res = {
              meta : data.meta,
              data : data.data?.map((item): Company => ({
                ...item,
                sektor_nama: item?.sektor_id?.nama
              }))
            }
            return res
        },
    })
}
