import { Request, Response, Router } from 'express';
import solrService from '../services/node-solr.service';

const router = Router();


router.post('/createSolrData', async (req: Request, res: Response) => {
    const createSolrData: any = await solrService.createSolrData(req.body)
    if (!createSolrData.status) return res.status(400).send(createSolrData);
    return res.status(201).send(createSolrData);
});

router.get('/getSolrData', async (req: Request, res: Response) => {
    const getSolrData: any = await solrService.getSolrData();
    if (!getSolrData.status) return res.status(400).send(getSolrData);
    return res.status(201).send(getSolrData);
});

router.put('/updateSolrData/', async (req: Request, res: Response) => {
    const updateSolrData: any = await solrService.updateSolrData(req.body)
    if (!updateSolrData.status) return res.status(400).send(updateSolrData);
    return res.status(201).send(updateSolrData)
});

router.delete('/deleteSolrData', async (req: Request, res: Response) => {
    const deleteSolrData: any = await solrService.deleteSolrData(req)
    if (!deleteSolrData.status) return res.status(400).send(deleteSolrData);
    return res.status(201).send(deleteSolrData);

});


export default router;
