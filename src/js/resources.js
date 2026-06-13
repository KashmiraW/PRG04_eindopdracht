import { ImageSource, Sound, Resource, Loader } from 'excalibur'




const Resources = {
    Cybercity: new ImageSource('images/cybercity.png'),
    Player: new ImageSource('images/player.png'),
    LifeUp: new ImageSource('images/heart.png')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }