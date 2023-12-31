import { fetchHouseById } from '@/api/card';
import { House } from '@/types/house';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import area from '../assets/icons/area.png';
import floor from '../assets/icons/floor.png';
import money from '../assets/icons/money.png';
import InfoBox from '@/components/InfoBox';
import furniture from '../assets/icons/furniture.png';
import { Button } from '@/components/ui/button';

type HouseParams = {
  id: string;
};

const HouseDetails = () => {
  const params = useParams<HouseParams>();
  const { id } = params;

  const parsedId = id ? parseInt(id, 10) : NaN;

  const {
    data: house,
    isError,
    isLoading
  } = useQuery<House>({
    queryKey: ['house', parsedId],
    queryFn: () => fetchHouseById({ id: parsedId })
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !house) {
    return <div>Error fetching data...</div>;
  }

  return (
    <>
      <Link to="/house">
        <Button className="text-base" variant="link">
          Go Back
        </Button>
      </Link>
      <h3 className="mt-2 mb-2 text-xl">{house.address}</h3>
      <div className="h-auto p-3 bg-gray-200 rounded-lg dark:bg-gray-800">
        <div className="grid w-full gap-4 lg:grid-rows-2 lg:grid-cols-4 md:grid-cols-2 md:grid-rows-2">
          {house.imageURLs.map((imageURL, index) => (
            <div
              key={index}
              className={`${
                index === 0
                  ? 'lg:col-span-2 lg:row-span-2 md:col-span-1 md:row-span-1'
                  : ''
              }`}
            >
              <img
                className="w-full h-full transition-all duration-200 rounded-lg object-fit opacity-90 hover:opacity-100"
                src={imageURL}
                alt="house image"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center w-full gap-3 mt-2">
        <InfoBox icon={money} header="Price" unit="AZN" value={house.price} />
        <InfoBox icon={area} header="Area" unit="m²" value={house.area} />
        <InfoBox icon={floor} header="Floor" value={house.floor} />
        <InfoBox
          icon={furniture}
          header="Furnished"
          value={house.isFurnished}
        />
        <InfoBox header="Description" value={house.description} />
      </div>
    </>
  );
};

export default HouseDetails;
