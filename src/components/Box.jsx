
import { useTranslation } from "react-i18next"

// eslint-disable-next-line react/prop-types
function Box({ headline, data }) {
    const { t } = useTranslation()
    return (
        <div className="bg-white border border-black w-full h-auto text-center rounded-md">
            <h3 className="w-full rounded-sm">
                {headline === "" ? t("Total DWLR Installed") : t(headline)}
            </h3>
            <h1 className="w-full rounded-sm text-3xl  font-semibold">{data}</h1>
        </div>
    )
}
export default Box
