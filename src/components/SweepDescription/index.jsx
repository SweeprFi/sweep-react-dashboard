import { useDispatch } from "react-redux";
import { languages } from "@config/languages";
import { AMMLinks } from "@config/constants";
import { ReactComponent as BalancerIcon } from "@images/icons/balancer.svg";
import SweepLogo from "@images/icon_sweep.svg"
import { setBuyPopup, setBridgePopup } from "@redux/app.reducers";

const SweepDescription = ({ marketPrice, chainId, connected, connectHandler }) => {
  const dispatch = useDispatch();
  const classButton = "flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 bg-white text-black whitespace-nowrap";
  const classContainer = "group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow w-11/12";

  const handleBuyPopup = async () => {
    if(connected) {
      dispatch(setBuyPopup({isOpen: true, marketPrice: marketPrice, chainId }));
    } else {
      await connectHandler();
    }
  }

  const handleBridgePopup = async () => {
    if(connected) {
      dispatch(setBridgePopup({ isOpen: true, selectedToken: 'sweep', chainId }));
    } else {
      await connectHandler();
    }
  }

  return (
    <div className="my-12">
      <div>
        <table>
          <tbody>
            <tr>
              <td className="flex justify-center">
                <div className={classContainer}>
                  <a
                    href={AMMLinks[chainId].link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
                  >
                    <button className={classButton}>
                      <BalancerIcon className="w-6 h-6" />
                      <span>{languages.btn_swap_balancer}</span>
                    </button>
                  </a>
                </div>
              </td>
              <td>
                <h1>{languages.text_swap_sweep}</h1>
              </td>
            </tr>
            <tr>
              <td className="flex justify-center">
                <div className={classContainer}>
                  <button onClick={handleBuyPopup} className={classButton}>
                    <img src={SweepLogo} alt="logo" className="w-6 mr-1" />
                    <span>{`${languages.btn_buy_sweep_on_market} $ ${marketPrice || 1}`}</span>
                  </button>
                </div>
              </td>
              <td>
                <h1>{languages.text_buy_at}</h1>
              </td>
            </tr>
            <tr>
              <td className="flex justify-center">
                <div className={classContainer}>
                  <button onClick={handleBridgePopup} className={classButton}>
                    <img src={SweepLogo} alt="logo" className="w-6 mr-1" />
                    <span>{languages.btn_sweep_bridge}</span>
                  </button>
                </div>
              </td>
              <td>
                <h1>{languages.text_bridge_sweep}</h1>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <h1 className="font-archivo-regular mb-4 release-title">
        {languages.text_how_sweep_works}
      </h1>
      <h1 className="font-archivo-regular my-6 release-title">
        {languages.text_asset_distribution}
      </h1>
    </div>
  )
}

export default SweepDescription;
