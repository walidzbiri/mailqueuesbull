const {emailQueue}=require('./emailQueue');

// Producer
const sendEmail=(data)=>{
    emailQueue.add(data,{

    })
};

module.exports={sendEmail};
