const Queue = require('bull');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const {emailProcess}=require('./emailConsumer');


const emailQueue = new Queue('email queue', 'redis://127.0.0.1:3333');
emailQueue.process(emailProcess)

const serverAdapter = new ExpressAdapter();
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [
      new BullAdapter(emailQueue)
    ],
    serverAdapter:serverAdapter
});

serverAdapter.setBasePath('/admin/queues')



module.exports={emailQueue,serverAdapter};
