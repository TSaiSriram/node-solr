import * as solr from 'solr-client';
import * as config from '../config';
import { solrData } from '../interfaces/solrData.interface';

const client = solr.createClient({
    host: config.SOLR_HOST,
    port: config.SOLR_PORT,
    core: config.SOLR_CORE
});


const createSolrData = (createdData: solrData[]) => {
    return new Promise((resolve, reject) => {
        client.add(createdData, undefined, (err: any, obj: any) => {
            if (err) {
                reject({ status: false, error: err })
            } else {
                resolve({ status: true, data: obj })
            }
        });
    });
};



const getSolrData = async () => {
    return new Promise((resolve, reject) => {
        // search document using strQuery
        const query = client.query()
            .q('*:*').start(0)
            .rows(25).sort({ id: 'asc' });

        client.search(query, async (err: Error, obj: any) => {
            if (err) {
                reject({ status: false, error: err })
            } else {
                resolve({ status: true, data: obj.response["docs"] })
            }
        });
    })
};

const getSolrDataByID = async (req: any) => {
    return new Promise((resolve, reject) => {
        // search document using strQuery
        console.log(req.query)
        const query = client.query()
            .q("*:*").start(0).matchFilter("id", req.query.id);

        client.search(query, async (err: Error, obj: any) => {
            if (err) {
                reject({ status: false, error: err })
            } else {
                resolve({ status: true, data: obj.response["docs"] })
            }
        });
    })
};

const updateSolrData = async (updateData: any) => {
    return new Promise((resolve, reject) => {

        client.add(updateData, undefined, (err, result: any) => {
            if (err) {
                reject({ status: false, error: err })
                return;
            }
            else
                resolve({ status: true, message: "sucessfully Updated", response: result.responseHeader });
        })

    })
};

const deleteSolrData = async (req: any) => {

    return new Promise((resolve, reject) => {
        // Delete document using strQuery
        let data: any;
        client.delete('id', req.query.id, undefined, (err, result: any) => {
            if (err) {
                reject({ status: false, error: err })
                return;
            }
            else
                resolve({ status: true, message: "sucessfully deleted", response: result.responseHeader });
        })


    });

};

export default { getSolrData, createSolrData, updateSolrData, deleteSolrData, getSolrDataByID }

