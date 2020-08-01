const ParseStringAsArray = require('../utils/ParseStringAsArray');
const Dev = require('../model/Dev');

module.exports = {
    async index(request, response){
       const{ latitude, longitude, techs } = request.query;

       const techsArray = ParseStringAsArray(techs);
       console.log(request.query);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location:{
                $near: {
                    //objetos perto da localização
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

       return response.json({ devs });

    }
}