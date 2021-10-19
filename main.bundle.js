(()=>{"use strict";var t,e={426:(t,e,i)=>{i.d(e,{Z:()=>a});var s=i(445),n=i.n(s),o=i(352),r=i.n(o)()(n());r.push([t.id,"@import url(https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@600&display=swap);"]),r.push([t.id,"* {\n    padding: 0;\n    margin: 0;\n}\n\nbody  {\n    background: #191919;\n    font-family: 'Source Sans Pro', sans-serif;\n}\n\n#gui-stats-container {\n    display: flex;\n    font-size: 14px;\n    position: fixed;\n    left: 50%;\n    top: 0;\n    transform: translate(-50%,0);\n    color: aliceblue;\n}\n\n#gui-stats-container span {\n    width: 100px;\n}\n\n#gui-build-container {\n    opacity: 0.9;\n    position: fixed;\n    top: 50%;\n    transform: translate(0, -50%);\n    padding: 2px 8px;\n    width: 120px;\n    margin-left: 8px;\n    text-align: center;\n    background: rgba(26, 28, 44, 0.4);\n}\n\n#gui-build-container h2 {\n    font-size: 24px;\n    text-transform: uppercase;\n    color: aliceblue;\n    margin: 0 0 4px;\n}\n\n#gui-build-container button {\n    font-family: 'Source Sans Pro', sans-serif;\n    font-size: 32px;\n    display: block;\n    padding: 0.3em;\n    margin-bottom: 0.2em;\n    width: 100%;\n}\n","",{version:3,sources:["webpack://./src/style.css"],names:[],mappings:"AAEA;IACI,UAAU;IACV,SAAS;AACb;;AAEA;IACI,mBAAmB;IACnB,0CAA0C;AAC9C;;AAEA;IACI,aAAa;IACb,eAAe;IACf,eAAe;IACf,SAAS;IACT,MAAM;IACN,4BAA4B;IAC5B,gBAAgB;AACpB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,YAAY;IACZ,eAAe;IACf,QAAQ;IACR,6BAA6B;IAC7B,gBAAgB;IAChB,YAAY;IACZ,gBAAgB;IAChB,kBAAkB;IAClB,iCAAiC;AACrC;;AAEA;IACI,eAAe;IACf,yBAAyB;IACzB,gBAAgB;IAChB,eAAe;AACnB;;AAEA;IACI,0CAA0C;IAC1C,eAAe;IACf,cAAc;IACd,cAAc;IACd,oBAAoB;IACpB,WAAW;AACf",sourcesContent:["@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@600&display=swap');\n\n* {\n    padding: 0;\n    margin: 0;\n}\n\nbody  {\n    background: #191919;\n    font-family: 'Source Sans Pro', sans-serif;\n}\n\n#gui-stats-container {\n    display: flex;\n    font-size: 14px;\n    position: fixed;\n    left: 50%;\n    top: 0;\n    transform: translate(-50%,0);\n    color: aliceblue;\n}\n\n#gui-stats-container span {\n    width: 100px;\n}\n\n#gui-build-container {\n    opacity: 0.9;\n    position: fixed;\n    top: 50%;\n    transform: translate(0, -50%);\n    padding: 2px 8px;\n    width: 120px;\n    margin-left: 8px;\n    text-align: center;\n    background: rgba(26, 28, 44, 0.4);\n}\n\n#gui-build-container h2 {\n    font-size: 24px;\n    text-transform: uppercase;\n    color: aliceblue;\n    margin: 0 0 4px;\n}\n\n#gui-build-container button {\n    font-family: 'Source Sans Pro', sans-serif;\n    font-size: 32px;\n    display: block;\n    padding: 0.3em;\n    margin-bottom: 0.2em;\n    width: 100%;\n}\n"],sourceRoot:""}]);const a=r},516:(t,e,i)=>{var s=i(701),n=i.n(s),o=i(426);n()(o.Z,{insert:"head",singleton:!1}),o.Z.locals;var r=i(76),a=i(709),c=i(280),l=i(890),h=i(858),d=i(726),p=i(653);const u=new a.BoxGeometry,m=new a.MeshLambertMaterial({color:65280}),w=new a.Mesh(u,m);function y({materialParams:t,geometry:e,meshProperties:i}){const s=e?new a.Mesh(e,m):w.clone();return t&&(s.material=new a.MeshLambertMaterial(t)),i&&Object.assign(s,i),s}const g=new a.Sprite;var f,A=i(846);class b{constructor(t){this.object3D=t,this.lastUpdated=-1}free(){var t;null===(t=this.object3D.parent)||void 0===t||t.remove(this.object3D)}}class v{constructor(t={}){this.position=new a.Vector3,this.rotation=new a.Quaternion,this.scale=(new a.Vector3).setScalar(1),this.lastUpdated=-1,function(t,...e){for(const i of e)for(const e of Object.keys(i)){const s=i[e];void 0!==s&&(t[e]=s)}}(this,t),this.prevPosition=this.position.clone(),this.prevRotation=this.rotation.clone(),this.prevScale=this.scale.clone()}}class T{constructor(t){this.body=t}free(){var t;null===(t=this.body.world)||void 0===t||t.removeBody(this.body)}}!function(t){t[t.None=0]="None",t[t.Turret=1]="Turret",t[t.Bullet=2]="Bullet",t[t.AmmoLoader=3]="AmmoLoader",t[t.Ammo=4]="Ammo",t[t.Tumbler=5]="Tumbler",t[t.HQ=6]="HQ",t[t.RiverSpawner=7]="RiverSpawner"}(f||(f={}));class C{constructor(t=0,e){this.entity=null,this.type=t,this.object3D=e}addToGame(t){this.game=t,this.children&&this.children.forEach((t=>this.object3D.add(t))),this.container=this.container||this.game.threeApp.scene,this.container.add(this.object3D),this.entity=this.game.world.create(new b(this.object3D),new v(this.transform),A.Tag.for(this.type)),this.object3D.userData.entity=this.entity,this.body&&(this.game.world.emplace(this.entity,new T(this.body)),this.game.physics.world.addBody(this.body)),this.additionalComponents&&this.game.world.insert(this.entity,...this.additionalComponents)}}const x=y({materialParams:{color:3716964},meshProperties:{castShadow:!0}}),S=function(t=1,e=64){const i=[],s=new a.CircleGeometry(t,e).getAttribute("position");for(let t=1;t<s.count;t++)i.push((new a.Vector3).fromBufferAttribute(s,t));return(new a.BufferGeometry).setFromPoints(i)}(8/3),O=new a.LineBasicMaterial({color:61098}),E=new a.LineLoop(S,O);E.translateY(-.45),E.rotateX(Math.PI/2),x.add(E);class I extends C{constructor(t,e=new a.Euler){super(f.HQ,x.clone());const i=(new a.Quaternion).setFromEuler(e);this.body=new p.uT({type:p.uT.STATIC,shape:new p.xu(new p.AO(1,1,1).scale(1.5)),position:new p.AO(t.x,t.y,t.z),quaternion:i.clone()}),this.transform={position:t,rotation:i.clone(),scale:(new a.Vector3).setScalar(3)}}}var B;!function(t){t[t.RiverSpawner=0]="RiverSpawner",t[t.Turret=1]="Turret",t[t.Loader=2]="Loader"}(B||(B={}));class P{constructor(t,e,i=new a.Vector3,s=0,n=!0,o=!1,r=new a.Quaternion,c=new a.Line3){if(this.type=t,this.interval=e,this.origin=i,this.tick=s,this.active=n,this.useAmmo=o,this.direction=r,this.spawnArea=c,e<1)throw"Emitter interval must be at least 1"}}const L=(new a.BufferGeometry).setFromPoints([new a.Vector3(.5),new a.Vector3(-.5)]),M=new a.Line(L,new a.LineBasicMaterial({color:65535}));class k extends C{constructor(t,e=1,i=0){super(f.RiverSpawner,M.clone());const s=i*(Math.PI/2),n=new a.Euler(0,s+Math.PI/2),o=new a.Vector3(e/2).applyEuler(n);this.transform={position:t,rotation:(new a.Quaternion).setFromEuler(n),scale:new a.Vector3(e)};const r=t.clone().sub(o),c=t.clone().add(o);this.additionalComponents=[new P(B.RiverSpawner,200,t,199,!0,!1,(new a.Quaternion).setFromEuler(new a.Euler(0,s)),new a.Line3(r,c))]}}class R{constructor(){this.solver=new p.H5(new p.wf),this.world=new p.q3({gravity:new p.AO(0,-20,0),allowSleep:!0,quatNormalizeFast:!0,solver:this.solver}),this.world.broadphase=new p.BQ(this.world),this.solver.iterations=10,this.solver.tolerance=1e-7,this.world.addContactMaterial(new p.kp(R.Materials.ground,R.Materials.tumbler,{friction:100,restitution:.5}))}}R.Materials={ground:new p.F5("ground"),tumbler:new p.F5("tumbler")};class j{constructor(t){this.game=t;const e=new a.PlaneGeometry(Math.pow(10,3),Math.pow(10,3)),i=new a.MeshLambertMaterial({color:2696783}),s=new a.Mesh(e,i);s.receiveShadow=!0,s.position.y=0,s.position.x=j.Origin.x,s.position.z=j.Origin.y,s.rotateX(-Math.PI/2),this.game.threeApp.scene.add(s),this.ground=s;const n=new p.uT({type:p.uT.STATIC,shape:new p.JO,material:R.Materials.ground});n.position.y=0,n.quaternion.setFromEuler(-Math.PI/2,0,0),this.game.physics.world.addBody(n)}create(){new I(new a.Vector3(j.Origin.x,1.5,j.Origin.y),new a.Euler(0,.2)).addToGame(this.game),new k(new a.Vector3(0,.25,-14),12,0).addToGame(this.game)}}j.Origin=new a.Vector2(0,0),d.Z.install({THREE:a});class D{constructor(){this.renderer=new a.WebGLRenderer,this.composer=new c.x(this.renderer),this.scene=new a.Scene,this.camera=new a.OrthographicCamera(0,0,0,0,0,300),this.cameraControls=new d.Z(this.camera,this.renderer.domElement),this.systems=[],this.smaaPass=new h.d(0,0),this.smaa=!0,this.groups=new Map,this.renderer.shadowMap.enabled=!0,this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),function({scene:t,renderer:e}){e.shadowMap.type=a.PCFSoftShadowMap;const i=new a.AmbientLight(6104925,1.5);t.add(i);const s=new a.DirectionalLight(16777215,1);s.position.set(30,50,-20),s.castShadow=!0,s.shadow.camera.near=10,s.shadow.camera.far=100,s.shadow.camera.left=-40,s.shadow.camera.right=40,s.shadow.camera.bottom=-40,s.shadow.camera.top=40,s.shadow.mapSize.width=4096,s.shadow.mapSize.height=4096,s.shadow.camera.updateProjectionMatrix(),t.add(s)}(this),function({cameraControls:t}){t.distance=100,t.minZoom=.1,t.maxZoom=7,t.maxPolarAngle=.45*Math.PI,t.setTarget(j.Origin.x,0,j.Origin.y),t.polarAngle=Math.PI/4,t.azimuthAngle=2*Math.PI/6,t.mouseButtons.left=d.Z.ACTION.NONE,t.mouseButtons.right=d.Z.ACTION.ROTATE,t.mouseButtons.middle=d.Z.ACTION.TRUCK,t.dollyToCursor=!0,t.polarRotateSpeed=.5,t.azimuthRotateSpeed=.7,t.dampingFactor=.01,t.draggingDampingFactor=.02;const e=new a.Vector3,i=new a.Vector3,s=new a.Vector3,n=new a.Vector3;t.addEventListener("update",(()=>{t.getTarget(e),t.getPosition(i),s.subVectors(i,e),n.copy(e.addScaledVector(s,e.y/(e.y-i.y))),t.setTarget(n.x,0,n.z),n.add(s.setLength(100)),t.setPosition(n.x,n.y,n.z)}))}(this),this.scene.background=new a.Color(3680363);const t=new a.AxesHelper(3);t.position.set(0,.05,8),this.scene.add(t),this.composer.addPass(new l.C(this.scene,this.camera)),this.composer.addPass(this.smaaPass),window.addEventListener("resize",this.onWindowResize.bind(this)),this.onWindowResize();for(const t in f)if(!isNaN(Number(t))){const e=new a.Group;this.groups.set(Number(t),e),this.scene.add(e)}}render(t,e){this.systems.forEach((i=>i.update(t,e))),this.cameraControls.update(1),this.composer.render()}onWindowResize(){!function(t,e){const i=window.innerWidth/window.innerHeight;t.left=16*-i,t.right=16*i,t.top=16,t.bottom=-16,t.updateProjectionMatrix()}(this.camera),this.renderer.setSize(window.innerWidth,window.innerHeight),this.composer.setSize(window.innerWidth,window.innerHeight)}}class V{constructor(t){this.game=t,this.world=t.world,this.threeApp=t.threeApp,this.level=t.level}}var F;!function(t){t[t.Nearest=0]="Nearest",t[t.LowestAmmo=1]="LowestAmmo"}(F||(F={}));class N{constructor(t,e=1,i=!0,s=F.Nearest,n=!0,o=null){this.type=t,this.maxDistance=e,this.faceTarget=i,this.priority=s,this.preferExisting=n,this.entity=o}}class U extends V{constructor(){super(...arguments),this.transforms=this.world.view(b,v),this.targets=this.world.view(b,N)}update(t,e){this.transforms.each(((i,s,n)=>{const{position:o,quaternion:r,scale:a}=s.object3D,{prevPosition:c,prevRotation:l,prevScale:h}=n;-1===s.lastUpdated&&(s.lastUpdated=t,o.copy(c),r.copy(l),a.copy(h)),this.game.paused||(this.game.interpolate&&n.lastUpdated===t?(s.lastUpdated=t,c.equals(n.position)||o.lerpVectors(c,n.position,e),l.equals(n.rotation)||r.slerpQuaternions(l,n.rotation,e),h.equals(n.scale)||a.lerpVectors(h,n.scale,e)):n.lastUpdated>s.lastUpdated&&(s.lastUpdated=t,o.copy(n.position),r.copy(n.rotation),a.copy(n.scale)))})),this.targets.each(((t,{object3D:e},i)=>{if(!i.entity||!i.faceTarget)return;const s=this.world.get(i.entity,b);s&&e.lookAt(s.object3D.position)}))}}class z{constructor(t=new a.Vector3){this.vector3=t}}class G extends V{constructor(){super(...arguments),this.view=this.world.view(v,z)}update(t){this.view.each(((e,i,s)=>{i.position.add(s.vector3),i.lastUpdated=t}))}}class q{constructor(t,e,i=0,s=1,n=!1){this.direction=t,this.magnitude=e,this.limit=i,this.applyRate=s,this.showForceVector=n,this.velocity=new a.Vector3,this.dirty=!0}}class W{constructor(t,e=!1){this.origin=t,this.ccw=e}}const Q=Math.pow(.3,3),Z=y({materialParams:{color:7598071},meshProperties:{castShadow:!0}}),_=(new a.Vector3).setScalar(.3),H=new p.AO(1,1,1).scale(.15);class Y extends C{constructor(t,e){super(f.Tumbler,Z.clone()),this.body=new p.uT({mass:Q,shape:new p.xu(H.clone()),position:new p.AO(t.x,t.y,t.z),quaternion:new p._f(e.x,e.y,e.z,e.w),material:R.Materials.tumbler}),this.transform={position:t,rotation:e.clone(),scale:_.clone()},this.additionalComponents=[new W(j.Origin),new q(e.clone(),3,2,2)]}}const $=y({materialParams:{color:7598071}});class X extends C{constructor(t,e){super(f.Ammo,$.clone());const i=e.clone();this.transform={position:t,rotation:i,scale:(new a.Vector3).setScalar(.2)},this.additionalComponents=[new z(new a.Vector3(0,0,.1).applyQuaternion(i))]}}class J{constructor(t,e){this.current=t,this.sprite=e,this.max=t}free(){var t;null===(t=this.sprite.parent)||void 0===t||t.remove(this.sprite)}}const K=y({materialParams:{color:0,emissive:11006064,emissiveIntensity:1}});class tt extends C{constructor(t,e){super(f.Bullet,K.clone());const i=e.clone(),s=(n=e,o=a.MathUtils.degToRad(_t.TurretProperties.bulletSpread),n.clone().multiply((new a.Quaternion).setFromEuler(et.set(a.MathUtils.randFloat(-o,o),a.MathUtils.randFloat(-o,o),0,"YXZ"))));var n,o;this.transform={position:t.clone(),rotation:s,scale:(new a.Vector3).setScalar(.12)},this.additionalComponents=[new z(new a.Vector3(0,0,_t.TurretProperties.bulletSpeed).applyQuaternion(i))]}}const et=new a.Euler;class it extends V{constructor(){super(...arguments),this.view=this.world.view(P,v)}update(){this.view.each(((t,e,i)=>{if(e.active&&++e.tick>=e.interval)switch(e.tick=0,e.type){case B.Turret:if(e.useAmmo){const e=this.world.get(t,J);if(!e)throw"Turret missing ammo component";if(0===e.current)return;e.current--,e.sprite.scale.setComponent(0,e.current/e.max)}new tt(i.position,e.direction).addToGame(this.game);break;case B.Loader:new X(i.position.clone().add(e.origin),e.direction).addToGame(this.game);break;case B.RiverSpawner:new Y(e.spawnArea.at(Math.random(),new a.Vector3),e.direction).addToGame(this.game)}}))}}const st=Math.pow(100,2),nt=Math.pow(.15,2);class ot extends V{constructor(t){super(t),this.view=this.world.view(v,z,A.Tag.for(f.Bullet)),this.enemies=this.world.view(v,A.Tag.for(f.Tumbler)),this.raycaster=new a.Raycaster,this.tumblerGroup=this.threeApp.groups.get(f.Tumbler)}update(t){this.view.each(((e,i,s)=>{const n=s.vector3.length();if(n<.05||i.position.lengthSq()>st||i.position.y<=0)return void this.world.destroy(e);if(this.enemies.each(((t,{position:s})=>{if(i.position.distanceToSquared(s)<=nt)return this.hitEnemy(e,t),!1})),!this.world.exists(e))return;this.raycaster.set(i.position,s.vector3.clone().normalize()),this.raycaster.far=n;const[o]=this.raycaster.intersectObjects(this.tumblerGroup.children);o&&this.hitEnemy(e,o.object.userData.entity),this.world.exists(e)&&(i.scale.z=n/_t.TurretProperties.bulletSpeed,s.vector3.multiplyScalar(.95),i.scale.multiplyScalar(.98),i.lastUpdated=t)}))}hitEnemy(t,e){this.world.destroy(t)}}class rt{constructor(t){this.quaternion=t}}class at extends V{constructor(){super(...arguments),this.view=this.world.view(v,rt)}update(t){this.view.each(((e,i,s)=>{i.rotation.multiply(s.quaternion),i.lastUpdated=t}))}}const ct=new a.Object3D;class lt extends V{constructor(){super(...arguments),this.view=this.world.view(v,N),this.targetViews=new Map}update(t){this.view.each(((e,i,s)=>{const n=Math.pow(s.maxDistance,2),o=this.world.get(e,P);if(s.preferExisting){const e=s.entity&&this.world.get(s.entity,v);if(e&&e.position.distanceToSquared(i.position)<=n)return void ht(t,i,e,s,o)}let r;this.targetViews.has(s.type)||this.targetViews.set(s.type,this.world.view(v,A.Tag.for(s.type))),this.targetViews.get(s.type).each(((t,e)=>{const o=e.position.distanceToSquared(i.position);if(o>n)return;let a=0;switch(s.priority){case F.Nearest:a=(n-o)/n;break;case F.LowestAmmo:const e=this.world.get(t,J);a=(e.max-e.current)/e.max}a>0&&(!r||a>r[2])&&(r=[t,e,a])})),o&&(o.active=!!r),r?(s.entity=r[0],ht(t,i,r[1],s,o)):s.entity=null}))}}function ht(t,e,i,s,n){ct.position.copy(e.position),n&&(n.origin.lengthSq()>0&&ct.position.add(n.origin),ct.lookAt(i.position),n.direction.copy(ct.quaternion)),s.faceTarget&&(ct.lookAt(i.position),e.rotation.copy(ct.quaternion),e.lastUpdated=t)}const dt=Math.pow(100,2),pt=Math.pow(.5,2);class ut extends V{constructor(){super(...arguments),this.view=this.world.view(v,A.Tag.for(f.Ammo)),this.turrets=this.world.view(v,A.Tag.for(f.Turret))}update(){this.view.each(((t,e)=>{e.position.lengthSq()>dt||e.position.y<=0?this.world.destroy(t):this.turrets.each(((i,{position:s})=>{if(e.position.distanceToSquared(s)<=pt){this.world.destroy(t);const e=this.world.get(i,J);return e.current=Math.min(e.max,e.current+5),e.sprite.scale.setComponent(0,e.current/e.max),!1}}))}))}}const mt=Math.pow(50,2);class wt extends V{constructor(){super(...arguments),this.bodies=this.world.view(T,v)}update(t){this.bodies.each(((e,{body:i},{lastUpdated:s,prevPosition:n,prevRotation:o})=>{if(i.type===p.uT.DYNAMIC)return;if(s===t&&(i.position.copy(n),i.quaternion.copy(o)),i.type===p.uT.STATIC)return;const r=this.world.get(e,z);r?i.velocity.copy(r.vector3.clone().multiplyScalar(_t.TickRate)):i.velocity.setZero()})),this.game.physics.world.step(1/_t.TickRate),this.bodies.each(((e,{body:i},s)=>{i.type===p.uT.DYNAMIC&&(i.position.lengthSquared()>mt?this.world.destroy(e):i.sleepState!==p.uT.SLEEPY&&i.sleepState!==p.uT.SLEEPING&&(s.position.copy(i.position),s.rotation.copy(i.quaternion),s.lastUpdated=t))}))}}class yt extends V{constructor(){super(...arguments),this.transforms=this.world.view(v)}update(){this.transforms.each(((t,e)=>{e.prevPosition.copy(e.position),e.prevRotation.copy(e.rotation),e.prevScale.copy(e.scale)}))}}const gt=new a.Vector3(0,1,0),ft=360,At=2*Math.PI/ft,bt=[];for(let t=0;t<ft;t++)bt.push((new a.Quaternion).setFromAxisAngle(gt,-t*At-Math.PI/2));const vt=new a.Vector2;class Tt extends V{constructor(){super(...arguments),this.view=this.world.view(W,v,q)}update(t){this.view.each(((e,{origin:i,ccw:s},{position:n},o)=>{if(t%o.applyRate>0)return;vt.set(n.x,n.z).sub(i);let r=Math.round(vt.angle()/(2*Math.PI)*ft);s&&(r+=180);const a=bt[r%ft];o.direction.copy(a),o.dirty=!0}))}}class Ct extends V{constructor(){super(...arguments),this.view=this.world.view(T,q)}update(t){this.view.each(((e,{body:i},s)=>{if(!(t%s.applyRate>0))if(s.dirty&&(s.dirty=!1,s.velocity.set(s.magnitude,0,0).applyQuaternion(s.direction)),s.showForceVector&&(s.arrow||(s.arrow=new a.ArrowHelper,this.threeApp.scene.add(s.arrow)),s.arrow.setLength(s.magnitude),s.arrow.position.copy(i.position),s.arrow.setDirection(s.velocity.clone().normalize())),s.limit){const t=s.velocity.clone().normalize().dot(i.velocity.unit()),e=i.velocity.length()/s.limit*t,n=Math.min(1,1-e);n>0&&i.applyForce(s.velocity.clone().multiplyScalar(n))}else i.applyForce(s.velocity)}))}}const xt=new a.Box3,St=new a.Vector3;class Ot extends V{constructor(){super(...arguments),this.controls=this.threeApp.cameraControls}update(){if(D.FollowObject){if(!D.FollowObject.parent)return this.game.interaction.followObject(),void this.game.gui.update();xt.setFromObject(D.FollowObject),xt.getCenter(St),this.controls.setTarget(St.x,0,St.z,!0)}}}class Et{constructor(){this.world=new A.World,this.systems=[]}registerSystems(t){this.systems.push(new yt(t)),this.systems.push(new G(t)),this.systems.push(new at(t)),this.systems.push(new lt(t)),this.systems.push(new it(t)),this.systems.push(new ot(t)),this.systems.push(new ut(t)),this.systems.push(new Tt(t)),this.systems.push(new Ct(t)),this.systems.push(new wt(t)),t.threeApp.systems.push(new U(t)),t.threeApp.systems.push(new Ot(t))}update(t){this.systems.forEach((e=>e.update(t)))}}var It,Bt=i(187),Pt=i(429),Lt=i(542),Mt=i(307),kt=i(571),Rt=i(4),jt=function(t,e,i,s){return new(i||(i=Promise))((function(n,o){function r(t){try{c(s.next(t))}catch(t){o(t)}}function a(t){try{c(s.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,a)}c((s=s.apply(t,e||[])).next())}))};!function(t){t[t.TurretGeometry=0]="TurretGeometry",t[t.LoaderGeometry=1]="LoaderGeometry"}(It||(It={}));const Dt=[[It.TurretGeometry,kt],[It.LoaderGeometry,Rt]],Vt=new Map,Ft=Vt,Nt=new a.SpriteMaterial({color:10878916});let Ut,zt;class Gt extends C{constructor(t,e){Ut=Ut||y({geometry:Ft.get(It.TurretGeometry),materialParams:{color:3716964},meshProperties:{castShadow:!0}}),super(f.Turret,Ut.clone()),this.transform={position:t,rotation:e};const i=g.clone();i.position.set(0,.4,0),i.scale.setComponent(1,.2),i.material=Nt,this.children=[i],this.additionalComponents=[new P(B.Turret,Math.round(_t.TickRate/_t.TurretProperties.fireRate),new a.Vector3,0,!1,!0),new N(f.Tumbler,_t.TurretProperties.targetDistance),new J(100,i)]}}class qt extends C{constructor(t,e){zt=zt||y({geometry:Ft.get(It.LoaderGeometry),materialParams:{color:2991537},meshProperties:{castShadow:!0}}),super(f.AmmoLoader,zt.clone()),this.transform={position:t,rotation:e},this.additionalComponents=[new P(B.Loader,10,new a.Vector3(0,.9,0),0,!1),new N(f.Turret,5,!1,F.LowestAmmo,!1)]}}var Wt;!function(t){t[t.NONE=0]="NONE",t[t.FOLLOW=1]="FOLLOW",t[t.BUILD_TURRET=2]="BUILD_TURRET",t[t.BUILD_LOADER=3]="BUILD_LOADER"}(Wt||(Wt={}));class Qt{constructor(t){this.state=Wt.NONE,this.game=t;const e=new a.Raycaster;this.game.threeApp.renderer.domElement.addEventListener("mousedown",(t=>{if(0!==t.button)return;this.state===Wt.FOLLOW&&this.followObject();const i={x:t.clientX/window.innerWidth*2-1,y:-t.clientY/window.innerHeight*2+1};e.setFromCamera(i,this.game.threeApp.camera);const s=e.intersectObjects(this.game.threeApp.scene.children);if(this.state===Wt.NONE){const t=s.find((t=>this.game.world.has(t.object.userData.entity,A.Tag.for(f.Tumbler))));t&&this.followObject(t.object)}else{const t=s.find((t=>t.object===this.game.level.ground));if(t){if(t.point.manhattanLength()>50)return;switch(this.state){case Wt.BUILD_TURRET:new Gt(t.point.setComponent(1,.5)).addToGame(this.game);break;case Wt.BUILD_LOADER:new qt(t.point.setComponent(1,.5)).addToGame(this.game)}}}this.game.gui.update()}))}followObject(t=null){this.state=null===t?Wt.NONE:Wt.FOLLOW,this.game.threeApp.cameraControls.dollyToCursor=null===t,D.FollowObject=t}}class Zt{constructor(t){this.statsContainer=document.createElement("div"),this.buildContainer=document.createElement("div"),this.displays=[],this.buttons=[],this.game=t,this.statsContainer.id="gui-stats-container",document.body.appendChild(this.statsContainer),this.createDisplay("Tick",(()=>this.game.tick)),this.createDisplay("Entities",(()=>this.game.world.size())),this.createDisplay("Bodies",(()=>this.game.physics.world.bodies.length)),setInterval((()=>{this.displays.forEach((t=>t.update()))}),200),this.buildContainer.id="gui-build-container",document.body.appendChild(this.buildContainer);const e=document.createElement("h2");e.innerText="Build",this.buildContainer.appendChild(e),this.createButton("Turret",Wt.BUILD_TURRET),this.createButton("Loader",Wt.BUILD_LOADER),this.createButton("cancel",Wt.NONE,!0),this.update()}update(){this.game.interaction.state!==Wt.FOLLOW?(this.buildContainer.style.visibility="visible",this.buttons.forEach((({element:t,state:e,hideOnState:i})=>{t.disabled=this.game.interaction.state===e,i&&(t.style.visibility=this.game.interaction.state===e?"hidden":"visible")}))):this.buildContainer.style.visibility="hidden"}createDisplay(t,e){const i=document.createElement("span");this.statsContainer.appendChild(i),this.displays.push({name:t,update:()=>i.innerText=`${t}: ${e()}`,element:i})}createButton(t,e,i=!1){const s=document.createElement("button");s.innerText=t,s.addEventListener("click",(()=>{this.game.interaction.state=e,this.update()})),this.buildContainer.appendChild(s),this.buttons.push({element:s,state:e,hideOnState:i})}}class _t{constructor(){this.threeApp=new D,this.ecs=new Et,this.world=this.ecs.world,this.physics=new R,this.level=new j(this),this.interaction=new Qt(this),this.gui=new Zt(this),this.tick=0,this.paused=!1,this.interpolate=!0}init(){return t=this,e=void 0,s=function*(){yield function(){return jt(this,void 0,void 0,(function*(){const t=new Lt.L;yield Promise.all(Dt.map((([e,i])=>jt(this,void 0,void 0,(function*(){const s=yield t.loadAsync(i),n=Mt.O.mergeVertices(s.children[0].geometry,.01);n.translate(0,-.5,0),Vt.set(e,n)})))))}))}(),this.level.create(),this.ecs.registerSystems(this),function(t){const e=new Pt.XS({width:200}).addFolder("Simulation");e.add(_t,"TickTime",1,400).onChange((t=>_t.TickTime=t)),e.add({"Reset TickTime to default":()=>{_t.TickTime=1e3/_t.TickRate,e.updateDisplay()}},"Reset TickTime to default"),e.add({"+2000 ticks":()=>{for(let e=0;e<2e3;e++)t.ecs.update(++t.tick)}},"+2000 ticks"),e.add(t,"interpolate"),e.add(t,"paused"),e.add(t.threeApp,"smaa").onFinishChange((e=>t.threeApp.smaaPass.enabled=e)),e.open()}(this);const t=(0,Bt.Z)();document.body.appendChild(t.dom);let e=0,i=performance.now();const s=()=>{requestAnimationFrame(s);const n=performance.now();if(!this.paused){let t=n-i;for(t>1e3&&(t=_t.TickTime),e+=t;e>=_t.TickTime;)this.ecs.update(++this.tick),e-=_t.TickTime}i=n,t.begin(),this.threeApp.render(this.tick,e/_t.TickTime),t.end()};for(;this.tick<_t.preloadTicks;)this.ecs.update(++this.tick);s()},new((i=void 0)||(i=Promise))((function(n,o){function r(t){try{c(s.next(t))}catch(t){o(t)}}function a(t){try{c(s.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,a)}c((s=s.apply(t,e||[])).next())}));var t,e,i,s}update(){}}_t.TickRate=60,_t.TickTime=1e3/_t.TickRate,_t.preloadTicks=2e3,_t.TurretProperties={fireRate:12,targetDistance:5,bulletSpeed:.5,bulletSpread:5},r.$.isWebGLAvailable()?(new _t).init():document.body.appendChild(r.$.getWebGLErrorMessage())},4:(t,e,i)=>{t.exports=i.p+"46dd26480c832f684059.obj"},571:(t,e,i)=>{t.exports=i.p+"cfcf1b27040a1ccb0b38.obj"}},i={};function s(t){var n=i[t];if(void 0!==n)return n.exports;var o=i[t]={id:t,exports:{}};return e[t].call(o.exports,o,o.exports,s),o.exports}s.m=e,t=[],s.O=(e,i,n,o)=>{if(!i){var r=1/0;for(l=0;l<t.length;l++){for(var[i,n,o]=t[l],a=!0,c=0;c<i.length;c++)(!1&o||r>=o)&&Object.keys(s.O).every((t=>s.O[t](i[c])))?i.splice(c--,1):(a=!1,o<r&&(r=o));a&&(t.splice(l--,1),e=n())}return e}o=o||0;for(var l=t.length;l>0&&t[l-1][2]>o;l--)t[l]=t[l-1];t[l]=[i,n,o]},s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),s.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;s.g.importScripts&&(t=s.g.location+"");var e=s.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var i=e.getElementsByTagName("script");i.length&&(t=i[i.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=t})(),(()=>{var t={179:0};s.O.j=e=>0===t[e];var e=(e,i)=>{var n,o,[r,a,c]=i,l=0;for(n in a)s.o(a,n)&&(s.m[n]=a[n]);if(c)var h=c(s);for(e&&e(i);l<r.length;l++)o=r[l],s.o(t,o)&&t[o]&&t[o][0](),t[r[l]]=0;return s.O(h)},i=self.webpackChunktd_trial=self.webpackChunktd_trial||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))})();var n=s.O(void 0,[189],(()=>s(516)));n=s.O(n)})();
//# sourceMappingURL=main.bundle.js.map