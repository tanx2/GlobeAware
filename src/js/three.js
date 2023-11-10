import * as T from 'three';
// eslint-disable-next-line import/no-unresolved
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import fragment from '../shaders/fragment.glsl';
import vertex from '../shaders/vertex.glsl';

import map from './earth2k.jpg'


const device = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: window.devicePixelRatio
};

export default class Three {
  constructor(canvas) {
    this.canvas = canvas;

    this.scene = new T.Scene();

    this.camera = new T.PerspectiveCamera(
      75,
      device.width / device.height,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 2);
    this.scene.add(this.camera);

    this.renderer = new T.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true
    });
    this.renderer.setSize(device.width, device.height);
    this.renderer.setPixelRatio(Math.min(device.pixelRatio, 2));

    this.controls = new OrbitControls(this.camera, this.canvas);

    this.clock = new T.Clock();

    this.time = 0.0;

    this.setLights();
    this.setGeometry();
    this.render();
    this.setResize();

    


  }

  setLights() {
    this.ambientLight = new T.AmbientLight(new T.Color(1, 1, 1, 1));
    this.scene.add(this.ambientLight);
  }

  setGeometry() {
    this.planeGeometry = new T.SphereGeometry(1, 1000, 1000);
    this.planeMaterial = new T.ShaderMaterial({
      side: T.DoubleSide,
      wireframe: false,
      fragmentShader: fragment,
      vertexShader: vertex,
      uniforms: {
        progress: { type: 'f', value: 0 }
      },
    
    });

    this.materialC = new T.ShaderMaterial({
      //side: T.DoubleSide,
      wireframe: true,
      fragmentShader: fragment,
      vertexShader: vertex,
      transparent:true,
      uniforms: {
        progress: { type: 'f', value: 0 },
        time: { type: 'f', value: 0 },
        color: { type: 'f', value: 0 }
      },
    });

    this.planeMaterial = new T.MeshBasicMaterial({
      map: new T.TextureLoader().load(map)
    })


    this.planeMesh = new T.Mesh(this.planeGeometry, this.planeMaterial);
    this.scene.add(this.planeMesh);

    
    let mesh = new T.Mesh(
      new T.SphereGeometry(0.05, 200, 200),
      new T.MeshBasicMaterial({color:0xff0000})
    );

    let mesh2 = new T.Mesh(
      new T.SphereGeometry(0.05, 200, 200),
      new T.MeshBasicMaterial({color:0x00ff00})
    );
    

    let point1 = {
      lat: 34.0522,
      lng: -118.2437
    }

    let point2 = {
      lat: 23.8041,
      lng: 90.4152
    }

    let point3 = {
      lat: 34.0522,
      lng: -118.2437
    }

    //Afghanistan
    let tal1 = {
      lat: 33.9391,
      lng: 67.7100
    }
    //Pakistan
    let tal2 = {
      lat: 30.3753,
      lng: 69.3451
    }
    //Turkmenistan
    let tal3 = {
      lat: 38.9697,
      lng: 59.5563
    }
    //Tajikistan
    let tal4 = {
      lat: 38.8610,
      lng: 71.2761
    }

    

    let taliban = [
      tal1,
      tal2,
      tal3,
      tal4,
    ]
    console.log('fix');
    
    // for (let i = 0; i < taliban.length - 1; i++) {
    //   let pos1 = this.calcPosFromLatLonRad(taliban[i].lat, taliban[i].lng);
    //   let pos2 = this.calcPosFromLatLonRad(taliban[i+1].lat, taliban[i+1].lng);
    //   console.log(pos1, pos2);
    // }

     for (let i = 0; i < taliban.length - 1; i++) {
      let pos1 = this.calcPosFromLatLonRad(taliban[i].lat, taliban[i].lng);
      let pos2 = this.calcPosFromLatLonRad(taliban[i+1].lat, taliban[i+1].lng);
      let mesh = new T.Mesh(
        new T.SphereGeometry(0.01, 200, 200),
        new T.MeshBasicMaterial({color:0xff0000})
      );
      mesh.position.set(pos1.x, pos1.y, pos1.z);
      this.scene.add(mesh);
      this.getCurve(pos1, pos2);
    }





    // let pos = this.calcPosFromLatLonRad(tal1.lat, tal1.lng);
    // let pos2 = this.calcPosFromLatLonRad(tal2.lat, tal2.lng);
    // mesh.position.set(pos.x, pos.y, pos.z);
    // mesh2.position.set(pos2.x, pos2.y, pos2.z);

    // this.scene.add(mesh);
    // this.scene.add(mesh2);
    // this.getCurve(pos, pos2);

    
    //Somalia
    let isil1 = {
      lat: 5.1521,
      lng: 46.1996
    }
    //Ethiopia
    let isil2 = {
      lat: 9.1450,
      lng: 40.4897
    }
    //Kenia
    let isil3 = {
      lat: -0.0236,
      lng: 37.9062
    }
    //Uganda
    let isil4 = {
      lat: 1.3733,
      lng: 32.2903
    }
    //Djibouti
    let isil5 = {
      lat: 11.8251,
      lng: 42.5903
    }
    //Tanzania
    let isil6 = {
      lat: -6.3690,
      lng: 34.8888
    }

    let isil = [
      isil1,
      isil2,
      isil3,
      isil4,
      isil5,
      isil6
    ]
    console.log('fix');

    for (let i = 0; i < isil.length - 1; i++) {
      let pos1 = this.calcPosFromLatLonRad(isil[i].lat, isil[i].lng);
      let pos2 = this.calcPosFromLatLonRad(isil[i+1].lat, isil[i+1].lng);
      let mesh = new T.Mesh(
        new T.SphereGeometry(0.01, 200, 200),
        new T.MeshBasicMaterial({color:0x00ff00})
      );
      mesh.position.set(pos1.x, pos1.y, pos1.z);
      this.scene.add(mesh);
      this.getCurve(pos1, pos2);
    }

    let bh1 = {
      lat: 9.0820,
      lng: 8.6753
    }
    //Ethiopia
    let bh2 = {
      lat: 7.3697,
      lng: 12.3547
    }
    //Kenia
    let bh3 = {
      lat: 15.4542,
      lng: 18.7322
    }
    //Uganda
    let bh4 = {
      lat: 17.6078,
      lng: 8.0817
    }
    //Djibouti
    let bh5 = {
      lat: 12.2383,
      lng: -1.5616
    }
    //Tanzania
    let bh6 = {
      lat: 17.5707,
      lng: -3.9962
    }

    let bh = [
      bh1,
      bh2,
      bh3,
      bh4,
      bh5,
      bh6
    ]
    console.log('fix');

    for (let i = 0; i < bh.length - 1; i++) {
      let pos1 = this.calcPosFromLatLonRad(bh[i].lat, bh[i].lng);
      let pos2 = this.calcPosFromLatLonRad(bh[i+1].lat, bh[i+1].lng);
      let mesh = new T.Mesh(
        new T.SphereGeometry(0.01, 200, 200),
        new T.MeshBasicMaterial({color:0x0000ff})
      );
      mesh.position.set(pos1.x, pos1.y, pos1.z);
      this.scene.add(mesh);
      this.getCurve(pos1, pos2);
    }

    // US
    let bn1 = {
      lat: 37.0902,
      lng: -95.7129
    }
    //Rhodesia
    let bn2 = {
      lat: 19.0167,
      lng: 30.0167
    }
    //SA
    let bn3 = {
      lat: -30.5595 ,
      lng: 22.9375
    }
    let bn4 = {
      lat: -30.5595 ,
      lng: 22.9375
    }
    

    let bn = [
      bn1,
      bn2,
      bn3
    ]
    console.log('fix');

    for (let i = 0; i < bn.length - 1; i++) {
      let pos1 = this.calcPosFromLatLonRad(bn[i].lat, bn[i].lng);
      let pos2 = this.calcPosFromLatLonRad(bn[i+1].lat, bn[i+1].lng);
      let mesh = new T.Mesh(
        new T.SphereGeometry(0.01, 200, 200),
        new T.MeshBasicMaterial({color:0xFFFF00})
      );
      mesh.position.set(pos1.x, pos1.y, pos1.z);
      this.scene.add(mesh);
      this.getCurve(pos1, pos2);
    }
    

  }


  getCurve(p1, p2){

    
    let v1 = new T.Vector3(p1.x, p1.y, p1.z);
    let v2 = new T.Vector3(p2.x, p2.y, p2.z);
    let points = []

    
    for (let i = 0; i <= 20; i++) {
      let p = new T.Vector3().lerpVectors(v1, v2, i/20);
      p.normalize();
      p.multiplyScalar(1 + 0.2 * Math.sin(Math.PI*i/20));
      console.log(p);
      points.push(p);
    }

    let path = new T.CatmullRomCurve3(points);

    const geometry = new T.TubeGeometry( path, 20, 0.01, 8, false );
    //const material = new T.MeshBasicMaterial( { color: 0x0000ff });
    const material = this.materialC;
    const mesh = new T.Mesh( geometry, material );
    this.scene.add( mesh );

    
    console.log('Get curve working');

  }

  convertLatLngToCartesian(p){
    let lat = p.lat * Math.PI/180;

    let lng = p.lng * Math.PI/180;

    let x = Math.cos(lng)*Math.sin(lat);
    let y = Math.sin(lng)*Math.cos(lat);
    let z = Math.cos(lng);

    return {x, y, z};
  }

  calcPosFromLatLonRad(lat, lon){
    var phi = (90-lat)*(Math.PI/180);
    var theta = (lon+180)*(Math.PI/180);

    let x = -(Math.sin(phi)*Math.cos(theta));
    let y = Math.cos(phi);
    let z = Math.sin(phi)*Math.sin(theta);
    console.log(phi, theta);
    console.log(x, y, z);
    return {x,y,z}
  }

  // calcPosFromLatLonRad(lat, lon) {
  //   var phi = (90-lat)*(Math.PI/180);
  //   var theta = (lon+180)*(Math.PI/180);
  //   let = -(Math.sin(phi)*Math.cos)
  //   return
  // }

  render() {
    let isAnimationRunning = false;
    if(isAnimationRunning){
      const elapsedTime = this.clock.getElapsedTime();

      this.planeMesh.rotation.x = 0.2 * elapsedTime;
      this.planeMesh.rotation.y = 0.1 * elapsedTime;
    
    }
    this.time += 0.05;
    this.materialC.uniforms.time.value = this.time;
    
    //this.planeMaterial.uniforms.time.value = this.time;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
    
  }

  setResize() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize() {
    device.width = window.innerWidth;
    device.height = window.innerHeight;

    this.camera.aspect = device.width / device.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(device.width, device.height);
    this.renderer.setPixelRatio(Math.min(device.pixelRatio, 2));
  }
}
