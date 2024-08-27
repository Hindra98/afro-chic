import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../../core/hooks/core-hooks";

const View = () => {
  
  const userConnected = useAppSelector(state=> state.getUser);
  return (

<div className="flex flex-row gap-4 justify-center items- gap-4 w-full pt-10">
  <div className="shadow rounded bg-white px-4 pt-6 pb-8">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-medium text-gray-800 text-lg">
        Personal Profile
      </h3>
      <Link to="?edit" className="text-primary">
        Edit
      </Link>
    </div>
    <div className="space-y-1">
      <h4 className="text-gray-700 font-medium">{userConnected.user.displayName || <span className="italic undefined">Nom d'utiisateur non défini</span>}</h4>
      <p className="text-gray-800">{userConnected.user.email}</p>
      <p className="text-gray-800">{userConnected.user.phoneNumber || <span className="italic undefined">Numéro de téléphone non défini</span>}</p>
    </div>
  </div>

  <div className="shadow rounded bg-white px-4 pt-6 pb-8">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-medium text-gray-800 text-lg">
        Shipping address
      </h3>
      <Link to="?address" className="text-primary">
        Edit
      </Link>
    </div>
    <div className="space-y-1">
      <h4 className="text-gray-700 font-medium">{userConnected.user.displayName || <span className="italic undefined">Nom d'utiisateur non défini</span>}</h4>
      <p className="text-gray-800">{userConnected.user.address || <span className="italic undefined">Adresse non définie</span>}</p>
      <p className="text-gray-800">20371</p>
      <p className="text-gray-800">{userConnected.user.phoneNumber || <span className="italic undefined">Numéro de téléphone non défini</span>}</p>
    </div>
  </div>

  <div className="shadow rounded bg-white px-4 pt-6 pb-8">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-medium text-gray-800 text-lg">
        Billing address
      </h3>
      <Link to="#" className="text-primary">
        Edit
      </Link>
    </div>
    <div className="space-y-1">
      <h4 className="text-gray-700 font-medium">{userConnected.user.displayName || <span className="italic undefined">Nom d'utiisateur non défini</span>}</h4>
      <p className="text-gray-800">{userConnected.user.address || <span className="italic undefined">Adresse non définie</span>}</p>
      <p className="text-gray-800">20317</p>
      <p className="text-gray-800">{userConnected.user.phoneNumber || <span className="italic undefined">Numéro de téléphone non défini</span>}</p>
    </div>
  </div>
</div>
  );
};

export default View;
