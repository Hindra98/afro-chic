import "../../../../../styles/_user-profile.scss";
// import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../../core/hooks/core-hooks";
import View from "./view";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { extractParamsUrl } from "../../../../../core/text/regex";
import Edit from "./edit";

const Home = () => {
  // const { t } = useTranslation();
  const userConnected = useAppSelector((state) => state.getUser);

  const { search } = useLocation();
  console.log("User: ", userConnected.user);
  console.log("params: ", search);
  window.document.title = "Profil Utilisateur";

  return (
    <div className=" h-[calc(100vh-45px)] flex flex-col justify-start mx-auto home">
      <div className="flex flex-row gap-5 items-start h-full">
        <div className="pe-4 h-full">
          <div className="px-4 py-3 shadow flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                src={userConnected.user.photoURL}
                alt="profile"
                className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover"
              />
            </div>
            <div className="flex-grow">
              <p className="text-gray-600">Bonjour,</p>
              <h4 className="text-gray-800 font-medium">
                {userConnected.user.displayName || userConnected.user.email}
              </h4>
            </div>
          </div>

          <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600 h-[calc(100vh-175px)]">
            <div className="space-y-1 pl-8">
              <Link
                to=""
                className={`relative block capitalize transition ${search === '' ? "text-primary" : " hover:text-primary"} `}
              >
                <span className="absolute -left-8 top-0 text-base">
                  <span className="icon address-card-oicon- text-lg"></span>
                </span>
                Information du profil
              </Link>
              <Link
                to="?edit"
                className={`relative block capitalize transition ${search === '?edit' ? "text-primary" : " hover:text-primary"} `}
              >
                Profile information
              </Link>
              <Link
                to="?address"
                className={`relative block capitalize transition ${search === '?address' ? "text-primary" : " hover:text-primary"} `}
              >
                Manage addresses
              </Link>
              <Link
                to="?password"
                className={`relative block capitalize transition ${search === '?password' ? "text-primary" : " hover:text-primary"} `}
              >
                Change password
              </Link>
            </div>

            <div className="space-y-1 pl-8 pt-4">
              <Link
                to="?order"
                className={`relative block capitalize transition ${search === '?order' ? "text-primary" : " hover:text-primary"} `}
              >
                <span className="absolute -left-8 top-0 text-base">
                  <span className="icon archive-1icon-"></span>
                </span>
                My order history
              </Link>
            </div>

            <div className="space-y-1 pl-8 pt-4">
              <Link
                to="?payement"
                className={`relative block capitalize transition ${search === '?payement' ? "text-primary" : " hover:text-primary"} `}
              >
                <span className="absolute -left-8 top-0 text-base">
                  <span className="icon credit-card-1icon-"></span>
                </span>
                Payment methods
              </Link>
            </div>

            <div className="space-y-1 pl-8 pt-4">
              <Link
                to="?wishlist"
                className={`relative block capitalize transition ${search === '?wishlist' ? "text-primary" : " hover:text-primary"} `}
              >
                <span className="absolute -left-8 top-0 text-base">
                  <span className="icon heart-2icon-"></span>
                </span>
                My wishlist
              </Link>
            </div>
          </div>
        </div>
        {search === "?edit" ? <Edit /> : <View />}
      </div>
    </div>
  );
};

export default Home;
