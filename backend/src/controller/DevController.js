const axios = require('axios');
const Dev = require('../model/Dev');
const ParseStringAsArray = require('../utils/ParseStringAsArray')

module.exports = {

    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    }, 

    async store(request, response){
        const { github_username, techs, latitude, longitude } = request.body;
        let dev = await Dev.findOne({github_username});

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
                    
            //console.log(request.body);
            const {name = login, bio, avatar_url} = apiResponse.data;
            const techArray  = ParseStringAsArray(techs);
            const location = {
                type:'Point',
                coordinates: [longitude, latitude],
            };
                    
            console.log(name, avatar_url, bio, techArray);

            dev = await Dev.create({
                github_username,
                name,
                bio,
                avatar_url,
                techs: techArray,
                location,
            });
        }

    return response.json({dev});
    },  

    async update(request, response){
        //nome, avatar, techs, bio

        const { name, avatar_url, techs, bio, github_username} = request.body;
        
        let dev = await Dev.findOne({ github_username });

        const techArray = ParseStringAsArray(techs);

        if(dev){

            console.log(name, avatar_url, bio, techArray);

            dev = await Dev.updateOne({
                name, 
                avatar_url,
                techArray,
                bio,
            });

        }
        console.log({ message: 'Atualizado '});

        return response.json({dev});
        
    },

    async destroy(request, response){
        const { github_username } = request.body;
        
        let dev = await Dev.findOne({ github_username });

        if (dev){

            dev = await Dev.deleteOne(dev);
        
        }
        console.log({ message: 'Dev deletado '});
        return response.json(dev);
    }
};