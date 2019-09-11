import * as solr from 'solr-client';
import * as config from '../config';
import { Request, Response, Router } from 'express';

var client = solr.createClient({
    host: config.SOLR_HOST,
    port: config.SOLR_PORT,
    core: config.SOLR_CORE
});


const createSolrData = (createdData: any) => {
    try {
        // var createdData: any = {
        //     "id": "MA147LL/A",
        //     "name": "Apple 60 GB iPod with Video Playback Black",
        //     "manu": "Apple Computer Inc.",
        //     "manu_id_s": "apple",
        //     "cat": ["electronics",
        //         "music"],
        //     "price_c____l_ns": 39900
        // }
        let response: any = { status: true };
        client.add(createdData, undefined, (err: any, obj: any) => {
            var data: any = [];
            if (err) {
                console.log(err);
                return;
            }
            else
                return
        });

        return response;

    } catch (error) {
        return { status: false, message: error }
    }
};

const getSolrData = async () => {
    try {
        // search document using strQuery
        var query = client.query()
            .q('electronics').start(0)
            .rows(2);

        let data: any;

        client.search(query, (err: Error, obj: Object) => {
            if (err) {
                console.log(err);
            } else
                data = JSON.stringify(obj)
        });
        return { status: true, data }
    } catch (error) {
        return { status: false, message: error }
    }
};

const updateSolrData = async (updateData: any) => {
    // Update document to Solr server
    try {

        // var updateData: any = {
        //     id: "MA147LL/A",
        //     manu: "Apple Inc.",
        //     manu_id_s: "Apple",
        // };

        let data: any;


        client.add(updateData, undefined, (err, result: any) => {
            if (err) {
                console.log(err);
                return;
            }
            else result.responseHeader
        })
        return { status: true, message: "sucessfully Updated", response: data };
    } catch (error) {
        return { status: false, message: error }
    }
};

const deleteSolrData = async (req: any) => {
    try {

        // Delete document using strQuery
        let data: any;
        client.delete('id', req.query.id, undefined, (err, result: any) => {
            if (err) {
                console.log("delete error", err);
                return;
            }
            else data = result.responseHeader;

        });

        return { status: true, message: "sucessfully deleted", response: data };

    } catch (error) {
        return { status: false, message: error }
    }

};

export default { getSolrData, createSolrData, updateSolrData, deleteSolrData }

