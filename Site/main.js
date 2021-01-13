const WIDTH = window.innerWidth - 15;
const HEIGHT = window.innerHeight - 100;

const URL = "https://borzzzenko.github.io/ComputerGraphics/Three.js-kitchen/";
const URL2 = "https://Oleksiy-Prog.github.io/"

// Load .obj model with .mtl
function loadMTLplusOBJ(mtlURL, objURL, loadFunction) {
	const objLoader = new THREE.OBJLoader();
	const mtlLoader = new THREE.MTLLoader();
	mtlLoader.load(mtlURL, (materials) => {
		materials.preload();
		objLoader.setMaterials(materials);

		objLoader.load(objURL, loadFunction);
	})
}

function main() {
	// Create scene, camera and render
	var scene = new THREE.Scene();
	scene.background = new THREE.Color(0xAAAAAA);

	const FOV = 90;
	const ASPECT = WIDTH/HEIGHT;
	const NEAR = 0.1;
	const FAR = 100;

	var camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
	camera.position.z = -5;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMap.enabled = true;
	document.body.appendChild(renderer.domElement);

	// Camera controls
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.update();

	// Floor
	const planeSize = 10;
	const textureLoader = new THREE.TextureLoader();

	const floorTexture = textureLoader.load("https://psv4.userapi.com/c856228/u28666477/docs/d11/1d78e37f7dfc/Besshovnaya_textura_laminata_3762.jpg?extra=TvWLrBSoVLusSZvARjGXikU5A0gJHzHEDjc-r3xEuZAwqDechXDiz3NFrfiebx8YicvN0icEo4FiHEDcJW5HRUo80jBoei3Q9kusgm8dOA31NRdFoCDUbDCJW_L5fjhH2pAWwtIYXkGaDXl2CB3tu3s");
	floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.magFilter = THREE.NearestFilter;

	const repeats = planeSize / 2;
	floorTexture.repeat.set(repeats, repeats);

	const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
	const planeMat = new THREE.MeshPhongMaterial({
		map: floorTexture,
		side: THREE.DoubleSide,
	});

	const floor = new THREE.Mesh(planeGeo, planeMat);
	floor.rotation.x = Math.PI * -0.5;
	floor.position.set(0, 0.1, 0);
	floor.receiveShadow = true;

	scene.add(floor);

	//potolok
	const ceilTexture = textureLoader.load("https://psv4.userapi.com/c532036/u28666477/docs/d24/789253558a0c/306-scaled.jpg?extra=uzK_Ej8sw6SlXEUmbYLHyLfFUbkWpVf0_5Sy-riXevnZlPfZjqcNlfSlhesnzSfO0YTK_nRLJ4sTQQBTxiCwyjdNcqGInBS6-InV0IaMjn3NIoeRJktxztIl_6V_SsdQyS11OX8KFPUnh1JwHeXB_nU");
	ceilTexture.wrapS = THREE.RepeatWrapping;
	ceilTexture.wrapT = THREE.RepeatWrapping;
	ceilTexture.magFilter = THREE.NearestFilter;

	const repeatsCeil = planeSize / 2;
	ceilTexture.repeat.set(repeatsCeil, repeatsCeil);

	const ceilGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
	const ceilMat = new THREE.MeshPhongMaterial({
		map: ceilTexture,
		side: THREE.DoubleSide,
	});

	const ceil = new THREE.Mesh(ceilGeo, ceilMat);
	ceil.rotation.x = Math.PI * -0.5;
	ceil.position.set(0, 4.9, 0);
	ceil.receiveShadow = true;

	scene.add(ceil);

	// Adding room walls
	let width = 10;
	let height = 5;
	let depth = 10;
	const wallsTexture = textureLoader.load("https://psv4.userapi.com/c537232/u28666477/docs/d15/f10a5dc0ebe8/loggia_51_rapport.jpg?extra=ePnyrJu4vrGn-YglQAhV2AlKjbIPE3cV9EGjupLvuETZP9dPvsZyzoQcZZ11M2uTJl-fyC2n8GVUADIknC5FRHwpWPoZIhB0dEXErAd6SA0DHmQw4qjE0_aCCSmndE7w-Z6YJShjC_nzJG0X3Ll5DyQ");
	wallsTexture.wrapS = THREE.RepeatWrapping;
	wallsTexture.wrapT = THREE.RepeatWrapping;
	wallsTexture.magFilter = THREE.NearestFilter;

	var geometry = new THREE.BoxGeometry(width, height, depth);
	var material = new THREE.MeshPhongMaterial({
		map: wallsTexture,
		side: THREE.DoubleSide
	});

	var roomCube = new THREE.Mesh(geometry, material);
	roomCube.receiveShadow = true;
	roomCube.position.set(0, 2.5, 0);

	scene.add(roomCube);

	// Lamp fiber
	var fiberRadius = 0.2;
	var fiberHeight = 5;

	var fiberGeometry = new THREE.CylinderGeometry(fiberRadius,
		 fiberRadius, fiberHeight);
	var fiberMaterial = new THREE.MeshPhongMaterial();

	var lampFiber = new THREE.Mesh(fiberGeometry, fiberMaterial);
	lampFiber.position.set(0, 4.7, 0);
	lampFiber.scale.set(0.1, 0.1, 0.1);

	scene.add(lampFiber);

	// Lamp
	var lampRadius = 2;
	var lampSegments = 64;

	var lampGeometry = new THREE.SphereGeometry(lampRadius, lampSegments,
		 lampSegments);
	var lampMaterial = new THREE.MeshBasicMaterial({
		color: 0xffffff,
	});

	var lamp = new THREE.Mesh(lampGeometry, lampMaterial);
	lamp.position.set(0, 4.5, 0);
	lamp.scale.set(0.1, 0.1, 0.1);

	scene.add(lamp);

	// Lamp light
	var lampLightIntensity = 1;
	var lampLightDistance = 45;

	const lampLight = new THREE.PointLight( 0xffffff, lampLightIntensity,
		 lampLightDistance);
	lampLight.position.set(0, 4.5, 0);
	lampLight.castShadow = true;

	scene.add(lampLight);

	// Table
	const tableTexture = textureLoader.load(URL + "textures/table-black.jpg");
	tableTexture.magFilter = THREE.NearestFilter

	// Table leg
	var legTopRadius = 0.15;
	var legBottomRadius = 0.1;
	var legHeight = 1.27;
	var legSegnments = 64;

	var tableLegGeometry = new THREE.CylinderGeometry(legTopRadius, legBottomRadius,
		legHeight, legSegnments);
	var legMaterial = new THREE.MeshStandardMaterial({
		map: tableTexture,
		roughness: 0,
	});

	var tableLeg = new THREE.Mesh(tableLegGeometry, legMaterial);
	tableLeg.position.set(2, 0.75,  -1.5);
	tableLeg.castShadow = true;
	tableLeg.receiveShadow = true;

	scene.add(tableLeg);

	// Table top
	var tableTopRadius = 1.5;
	var tableBottomRadius = 1.5;
	var tableHeight = 0.1;
	var tableSegnments = 64;

	var tableGeometry = new THREE.CylinderGeometry(tableTopRadius, tableBottomRadius,
		tableHeight, tableSegnments);
	var tableMaterial = new THREE.MeshStandardMaterial({
		map: tableTexture,
		roughness: 0,
	});

	var table = new THREE.Mesh(tableGeometry, tableMaterial);
	table.position.set(2, 1.4, -1.5);
	table.castShadow = true;
	table.receiveShadow = true;

	scene.add(table);

	// Table bottom stand
	var tableStandTopRadius = 0.5;
	var tableStandBottomRadius = 0.5;
	var tableStandHeight = 0.1;
	var tableStandSegnments = 64;

	var tableStandGeometry = new THREE.CylinderGeometry(tableStandTopRadius,
		 tableStandBottomRadius, tableStandHeight, tableStandSegnments);
	var tableStandMaterial = new THREE.MeshStandardMaterial({
		map: tableTexture,
		roughness: 0,
	});

	var tableStand = new THREE.Mesh(tableStandGeometry, tableStandMaterial);
	tableStand.position.set(2, 0.1, -1.5);
	tableStand.castShadow = true;
	tableStand.receiveShadow = true;

	scene.add(tableStand)

	// Load chairs
	loadMTLplusOBJ(URL + "models/chair.mtl", URL + "models/chair.obj",
		(chair) => {
			// First chair
			chair.traverse(function(child) {
				child.castShadow = true;
				child.receiveShadow = true;
			});
			chair.scale.set(0.02, 0.02, 0.02)
			chair.rotation.x = Math.PI * -0.5;
			chair.rotation.z += Math.PI * -0.7;

			chair.position.set(2.1, 0.97, 0.4);

			scene.add(chair);

		 }
	);

	// Load kitchen furniture
	loadMTLplusOBJ(URL + "models/furniture.mtl",
	 	URL + "models/furniture.obj", (furniture) => {
			furniture.traverse(function(child) {
				child.receiveShadow = true;
				child.castShadow = true;
			});

			furniture.scale.set(0.02, 0.02, 0.02);
			furniture.position.set(-16.8, 0, -10.5);

			//scene.add(furniture);
		}
	);

	// sofa
	loadMTLplusOBJ(URL2 + "Sofa/Sofa1.mtl",
	URL2 + "Sofa/Sofa1.obj", (furniture) => {
	   furniture.traverse(function(child) {
		   child.receiveShadow = true;
		   child.castShadow = true;
	   });

	   furniture.scale.set(0.02, 0.02, 0.02);
	   furniture.position.set(-16.8, 0, -10.5);

	   scene.add(furniture);
   }
);


	// Load plant
	loadMTLplusOBJ(URL + "models/plant.mtl",
	 	URL + "models/plant.obj", (plant) => {
			plant.traverse(function(child) {
				child.receiveShadow = true;
				child.castShadow = true;
			});

			plant.scale.set(0.04, 0.04, 0.04);
			plant.position.set(2, 1.4, -1.3);

			scene.add(plant);

            clone = plant.clone();
            clone.scale.set(0.04, 0.04, 0.04);
            clone.position.set(-0.5, 2.15, 2);

            scene.add(clone);
		}
	);


	// Animation loop
	var animate = function() {
		requestAnimationFrame(animate);

		controls.update();

		renderer.render(scene, camera);
	}

	animate();
}

main();
