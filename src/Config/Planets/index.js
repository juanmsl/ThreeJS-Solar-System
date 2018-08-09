import * as THREE from "three";
import {
    earthTexture, jupiterTexture, marsTexture,
    mercuryTexture, moonTexture, neptuneTexture, plutonTexture, saturnTexture,
    sunTexture, uranusTexture, venusTexture
} from "../Textures";

const minutesTakenToEarthToDoOneRound = 1;
const sizeOfTheEarth = 20;

const totalDays = (planet) => {
    return (planet.years * 365) + planet.days;
};

const minutesToDoRound = (planet) => {
    return (totalDays(planet) * minutesTakenToEarthToDoOneRound) / 365;
};

const degPerSeconds = (planet) => {
    return 360 / (minutesToDoRound(planet) * 60);
};

const radiusPlanet = (planet) => {
    return (planet.radius * sizeOfTheEarth) / 6378;
};

const planetsData = {
    sun: {
        years: 0,
        days: 0,
        radius: 295700
    },
    mercury: {
        years: 0,
        days: 88,
        radius: 2440
    },
    venus: {
        years: 0,
        days: 225,
        radius: 6052
    },
    earth: {
        years: 0,
        days: 365,
        radius: 6378
    },
    moon: {
        years: 0,
        days: 29,
        radius: 1737
    },
    mars: {
        years: 1,
        days: 322,
        radius: 3397
    },
    jupiter: {
        years: 11,
        days: 314,
        radius: 71492
    },
    saturn: {
        years: 29,
        days: 168,
        radius: 60268
    },
    uranus: {
        years: 84,
        days: 4,
        radius: 25559
    },
    neptune: {
        years: 164,
        days: 298,
        radius: 24746
    },
    pluton: {
        years: 147,
        days: 256,
        radius: 1160
    }
};

const planetsConfig = {
    sun: {
        planetRadius: radiusPlanet(planetsData.sun),
        velocityRotation: 5,
        material: new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            map: sunTexture
        })
    },
    mercury: {
        orbitRadius: 2000,
        planetRadius: radiusPlanet(planetsData.mercury),
        velocityRotation: 90,
        velocityTraslation: degPerSeconds(planetsData.mercury),
        material: new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            shininess: 15,
            map: mercuryTexture
        })
    },
    venus: {
        orbitRadius: 3000,
        planetRadius: radiusPlanet(planetsData.venus),
        velocityRotation: 90,
        velocityTraslation: degPerSeconds(planetsData.venus),
        material: new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            shininess: 100,
            map: venusTexture
        })
    },
    earth: {
        orbitRadius: 4000,
        planetRadius: radiusPlanet(planetsData.earth),
        velocityRotation: 90,
        velocityTraslation: degPerSeconds(planetsData.earth),
        material: new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            shininess: 15,
            map: earthTexture
        })
    },
    moon: {
        orbitRadius: 50,
        planetRadius: radiusPlanet(planetsData.moon),
        velocityRotation: 15,
        velocityTraslation: degPerSeconds(planetsData.moon),
        material: new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            shininess: 15,
            map: moonTexture
        })
    },
    mars: {
        orbitRadius: 5000,
        planetRadius: radiusPlanet(planetsData.mars),
        velocityRotation: 90,
        velocityTraslation: degPerSeconds(planetsData.mars),
        material: new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            shininess: 15,
            map: marsTexture
        })
    },
    jupiter: {
        orbitRadius: 6000,
        planetRadius: radiusPlanet(planetsData.jupiter),
        velocityRotation: 90,
        velocityTraslation: degPerSeconds(planetsData.jupiter),
        material: new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            shininess: 15,
            map: jupiterTexture
        })
    },
    saturn: {
        orbitRadius: 7000,
        planetRadius: radiusPlanet(planetsData.saturn),
        velocityRotation: 90,
        velocityTraslation: degPerSeconds(planetsData.saturn),
        material: new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            shininess: 15,
            map: saturnTexture
        }),
        rings: true
    },
    uranus: {
        orbitRadius: 8000,
        planetRadius: radiusPlanet(planetsData.uranus),
        velocityRotation: 90,
        velocityTraslation: degPerSeconds(planetsData.uranus),
        material: new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            shininess: 15,
            map: uranusTexture
        })
    },
    neptune: {
        orbitRadius: 9000,
        planetRadius: radiusPlanet(planetsData.neptune),
        velocityRotation: 90,
        velocityTraslation: degPerSeconds(planetsData.neptune),
        material: new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            shininess: 15,
            map: neptuneTexture
        })
    },
    pluton: {
        orbitRadius: 10000,
        planetRadius: radiusPlanet(planetsData.pluton),
        velocityRotation: 90,
        velocityTraslation: degPerSeconds(planetsData.pluton),
        material: new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            shininess: 15,
            map: plutonTexture
        })
    }
};

console.log("Velocity:", minutesTakenToEarthToDoOneRound + " / " + totalDays(planetsData.earth) * 24 * 60, "min");
console.log("Radius:", sizeOfTheEarth + " / " + planetsData.earth.radius, "km");

for (let planet in planetsConfig) {
    if(planet !== 'sun') {
        console.log(planet);
        console.log("  ", Math.round(planetsConfig[planet].velocityTraslation * 100) / 100, "deg/sec");
        console.log("  ", Math.round(minutesToDoRound(planetsData[planet]) * 100) / 100, "min");
    }
}

export default planetsConfig;