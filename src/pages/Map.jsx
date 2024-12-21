import { Feature, Map, View } from 'ol';
import { Point } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { useEffect, useRef, useState } from 'react';
import GeoJSON from 'ol/format/GeoJSON';
import { useNavigate } from 'react-router-dom';
import Legend from '../components/Legend';

const MapComponent = () => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts, setDistricts] = useState([]);
  const [borderLayers, setBorderLayers] = useState({});
  const [markerLayer, setMarkerLayer] = useState(null);
  const navigate = useNavigate();

  const status_code = {
    status_battery: {
      0: "Battery present",
      1: "Battery not present",
    },
    status_dwlr: {
      0: "All good",
      1: "No data",
      2: "Well depth error",
      3: "DWLR depth exceeded",
      4: "Redundant data",
      5: "Range",
    },
  };


  const markersByState = {
    madhya_pradesh: [
      { name: 'Agar Malwa', coordinates: [76.0186, 23.7118], status: status_code.status_battery[0] },
      { name: 'Indore', coordinates: [75.8577, 22.7196], status: status_code.status_battery[1] },
      { name: 'Bhopal', coordinates: [77.4126, 23.2599], status: status_code.status_dwlr[2] },
      { name: 'Gwalior', coordinates: [78.1828, 26.2183], status: status_code.status_battery[1] },
      { name: 'Jabalpur', coordinates: [79.9435, 23.1815], status: status_code.status_dwlr[0] },
      { name: 'Ujjain', coordinates: [75.7873, 23.1793], status: status_code.status_battery[1] }
    ],
    karnataka: [
      { name: 'Bangalore', coordinates: [77.5946, 12.9716], status: status_code.status_battery[0] },
      { name: 'Mysore', coordinates: [76.6394, 12.2958], status: status_code.status_battery[1] },
      { name: 'Mangalore', coordinates: [74.8560, 12.9141], status: status_code.status_dwlr[3] },
      { name: 'Hubli', coordinates: [75.1240, 15.3647], status: status_code.status_dwlr[4] },
      { name: 'Belgaum', coordinates: [74.5085, 15.8497], status: status_code.status_dwlr[5] }
    ]
  };


  const statusColors = {
    // Battery status colors
    "Battery present": '#28a745',  // Green
    "Battery not present": '#dc3545',  // Red

    // DWLR status colors
    "All good": '#007bff',  // Blue
    "No data": '#6c757d',   // Gray
    "Well depth error": '#ffc107',  // Yellow
    "DWLR depth exceeded": '#fd7e14',  // Orange
    "Redundant data": '#6f42c1',  // Purple
    "Range": '#e83e8c',  // Pink

    // Default fallback color
    "default": '#6c757d'  // Neutral gray
  };


  const addMarkersToMap = (stateMarkers) => {
    if (markerLayer) {
      markerLayer.getSource().clear();
    }

    const vectorSource = new VectorSource();
    stateMarkers.forEach(marker => {
      const coordinates = fromLonLat(marker.coordinates);
      const feature = new Feature({
        geometry: new Point(coordinates),
      });
      feature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 5,
            fill: new Fill({ color: statusColors[marker.status] }),
          }),
        })
      );
      vectorSource.addFeature(feature);
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    if (map) {
      map.addLayer(vectorLayer);
    }

    setMarkerLayer(vectorLayer);
  };

  useEffect(() => {
    const vectorSource = new VectorSource();


    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([75.6778, 15.9167]),
        zoom: 6,
      }),
    });

    setMap(initialMap);




    fetch('/geojson/karnataka.geojson')
      .then(response => response.json())
      .then(data => {
        const karnatakaFeatures = new GeoJSON().readFeatures(data, { featureProjection: 'EPSG:3857' });
        const karnatakaLayer = new VectorLayer({
          source: new VectorSource({ features: karnatakaFeatures }),
          style: new Style({
            stroke: new Stroke({
              color: 'black',
              width: 2,
            }),
            fill: new Fill({
              color: 'rgba(0, 0, 0, 0.1)',
            }),
          }),
        });
        initialMap.addLayer(karnatakaLayer);
        setBorderLayers(prev => ({ ...prev, karnataka: karnatakaLayer }));
      })
      .catch(error => console.error('Error loading Karnataka GeoJSON:', error));


    fetch('/geojson/madhyapradesh.geojson')
      .then(response => response.json())
      .then(data => {
        const mpFeatures = new GeoJSON().readFeatures(data, { featureProjection: 'EPSG:3857' });
        const mpLayer = new VectorLayer({
          source: new VectorSource({ features: mpFeatures }),
          style: new Style({
            stroke: new Stroke({
              color: 'black',
              width: 2,
            }),
            fill: new Fill({
              color: 'rgba(0, 0, 0, 0.1)',
            }),
          }),
        });
        initialMap.addLayer(mpLayer);
        setBorderLayers(prev => ({ ...prev, madhya_pradesh: mpLayer }));
      })
      .catch(error => console.error('Error loading Madhya Pradesh GeoJSON:', error));

    return () => initialMap.setTarget(undefined);
  }, []);


  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    setDistricts(districtNames[selectedState] || []);
    setSelectedDistrict('');


    Object.values(borderLayers).forEach(layer => {
      layer.setVisible(false);
    });


    if (borderLayers[selectedState]) {
      borderLayers[selectedState].setVisible(true);
    }


    addMarkersToMap(markersByState[selectedState] || []);
  };

  const stateNames = {
    andaman_and_nicobar_islands: 'Andaman and Nicobar Islands',
    andhra_pradesh: 'Andhra Pradesh',
    arunachal_pradesh: 'Arunachal Pradesh',
    assam: 'Assam',
    bihar: 'Bihar',
    chandigarh: 'Chandigarh',
    chhattisgarh: 'Chhattisgarh',
    dadra_and_nagar_haveli_and_daman_and_diu: 'Dadra and Nagar Haveli and Daman and Diu',
    delhi: 'Delhi',
    goa: 'Goa',
    gujarat: 'Gujarat',
    haryana: 'Haryana',
    himachal_pradesh: 'Himachal Pradesh',
    jammu_and_kashmir: 'Jammu and Kashmir',
    jharkhand: 'Jharkhand',
    karnataka: 'Karnataka',
    kerala: 'Kerala',
    ladakh: 'Ladakh',
    lakshadweep: 'Lakshadweep',
    madhya_pradesh: 'Madhya Pradesh',
    maharashtra: 'Maharashtra',
    manipur: 'Manipur',
    meghalaya: 'Meghalaya',
    mizoram: 'Mizoram',
    nagaland: 'Nagaland',
    odisha: 'Odisha',
    puducherry: 'Puducherry',
    punjab: 'Punjab',
    rajasthan: 'Rajasthan',
    sikkim: 'Sikkim',
    tamil_nadu: 'Tamil Nadu',
    telangana: 'Telangana',
    tripura: 'Tripura',
    uttar_pradesh: 'Uttar Pradesh',
    uttarakhand: 'Uttarakhand',
    west_bengal: 'West Bengal',
  };

  const districtNames = {
    andaman_and_nicobar_islands: ['Nicobar', 'North and Middle Andaman', 'South Andaman'],
    andhra_pradesh: ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'],
    arunachal_pradesh: ['Tawang', 'West Kameng', 'East Kameng', 'Papum Pare', 'Kurung Kumey', 'Kra Daadi', 'Lower Subansiri', 'Upper Subansiri', 'West Siang', 'East Siang', 'Siang', 'Upper Siang', 'Lower Siang', 'Lower Dibang Valley', 'Dibang Valley', 'Anjaw', 'Lohit', 'Namsai', 'Changlang', 'Tirap', 'Longding'],
    assam: ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup Metropolitan', 'Kamrup', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'],
    bihar: ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'],
    chandigarh: ['Chandigarh'],
    chhattisgarh: ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja'],
    dadra_and_nagar_haveli_and_daman_and_diu: ['Dadra and Nagar Haveli', 'Daman', 'Diu'],
    delhi: ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
    goa: ['North Goa', 'South Goa'],
    gujarat: ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'],
    haryana: ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
    himachal_pradesh: ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'],
    jammu_and_kashmir: ['Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal', 'Jammu', 'Kathua', 'Kishtwar', 'Kulgam', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Ramban', 'Reasi', 'Samba', 'Shopian', 'Srinagar', 'Udhampur'],
    jharkhand: ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela-Kharsawan', 'Simdega', 'West Singhbhum'],
    karnataka: ['Bagalkot', 'Ballari', 'Belagavi', 'Bengalore', 'Bengaluru Urban', 'Bidar', 'Chamarajanagara', 'Chikkaballapura', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'],
    kerala: ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],
    ladakh: ['Kargil', 'Leh'],
    lakshadweep: ['Lakshadweep'],
    madhya_pradesh: ['Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chachaura', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Maihar', 'Mandla', 'Mandsaur', 'Morena', 'Nagda', 'Narsinghpur', 'Neemuch', 'Niwari', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'],
    maharashtra: ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'],
    manipur: ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'],
    meghalaya: ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'],
    mizoram: ['Aizawl', 'Champhai', 'Hnahthial', 'Khawzawl', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Saitual', 'Serchhip'],
    nagaland: ['Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Noklak', 'Peren', 'Phek', 'Tuensang', 'Wokha', 'Zunheboto'],
    odisha: ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Debagarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'],
    puducherry: ['Karaikal', 'Mahe', 'Puducherry', 'Yanam'],
    punjab: ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Pathankot', 'Patiala', 'Rupnagar', 'Sangrur', 'SAS Nagar', 'SBS Nagar', 'Sri Muktsar Sahib', 'Tarn Taran'],
    rajasthan: ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur'],
    sikkim: ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'],
    tamil_nadu: ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram', 'Karur', 'Krishnagiri', 'Madurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'],
    telangana: ['Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Komaram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal Rural', 'Warangal Urban', 'Yadadri Bhuvanagiri'],
    tripura: ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'],
    uttar_pradesh: ['Agra', 'Aligarh', 'Prayagraj', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Ayodhya', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddh Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kushinagar', 'Lakhimpur Kheri', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shrawasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],
    uttarakhand: ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'],
    west_bengal: ['Alipurduar', 'Bankura', 'Paschim Bardhaman', 'Purba Bardhaman', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Medinipur', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur']
  };

  return (
    <>
      <div className='h-screen w-screen flex bg-[#D1E9F5]'>
        <div className=' w-2/12 flex flex-col p-10 item-center '>
          <div className='bottom-4'>
          </div>
          <span className='px-1'>Select a State/UT</span>
          <select
            name="state"
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            className='border border-black rounded-lg'
          >
            <option value="" disabled>Select</option>
            {Object.keys(stateNames).map(state => (
              <option key={state} value={state}>
                {stateNames[state]}
              </option>

            ))}
          </select>
          <br />
          <span className='px-1'>Select a District</span>
          <select
            name="district"
            id="district"
            value={selectedDistrict}
            onChange={event => setSelectedDistrict(event.target.value)}
            className='border border-black rounded-lg mb-6'
            disabled={!districts.length}
          >
            <option value="" disabled>Select</option>
            {districts.map(district => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-md bg-blue-500 text-white py-2 hover:bg-blue-600 transition w-28"
            onClick={() => { navigate("/dwlrinfo") }}
          >
            Check Status
          </button>
        </div>
        <div ref={mapRef} className='w-10/12' />
        <Legend statusColors={statusColors} />
      </div>
    </>
  );
};

export default MapComponent;