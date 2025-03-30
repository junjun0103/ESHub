import type React from "react"
import { useState, useEffect } from "react"
import type { Escort } from "../../../types"
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline"

interface ServiceSectionProps {
  profile: Escort | null
  onUpdate: (updatedData: Partial<Escort>) => void
}

interface Service {
  name: string
  isOffered?: boolean
  isCustom?: boolean
}

const defaultBaseServices: Service[] = [
  { name: "OWO (Oral without condom)", isOffered: false, isCustom: false },
  { name: "O-Level (Oral sex)", isOffered: false, isCustom: false },
  { name: "CIM (Come in mouth)", isOffered: false, isCustom: false },
  { name: "COF (Come on face)", isOffered: false, isCustom: false },
  { name: "COB (Come on body)", isOffered: false, isCustom: false },
  { name: "Swallow", isOffered: false, isCustom: false },
  { name: "DFK (Deep french kissing)", isOffered: false, isCustom: false },
  { name: "A-Level (Anal sex)", isOffered: false, isCustom: false },
  { name: "Anal Rimming (Licking anus)", isOffered: false, isCustom: false },
  { name: "69 (69 sex position)", isOffered: false, isCustom: false },
  { name: "Striptease/Lapdance", isOffered: false, isCustom: false },
  { name: "Erotic massage", isOffered: false, isCustom: false },
  { name: "Golden shower", isOffered: false, isCustom: false },
  { name: "Couples", isOffered: false, isCustom: false },
  { name: "GFE (Girlfriend experience)", isOffered: false, isCustom: false },
  { name: "Threesome", isOffered: false, isCustom: false },
  { name: "Foot fetish", isOffered: false, isCustom: false },
  { name: "Sex toys", isOffered: false, isCustom: false },
  {
    name: "Extraball (Having sex multiple times)",
    isOffered: false,
    isCustom: false,
  },
  { name: "Domination", isOffered: false, isCustom: false },
  {
    name: "LT (Long Time; Usually overnight)",
    isOffered: false,
    isCustom: false,
  },
]
const defaultExtraServices: Service[] = []

const ServiceSection: React.FC<ServiceSectionProps> = ({
  profile,
  onUpdate,
}) => {
  const [baseServices, setBaseServices] =
    useState<Service[]>(defaultBaseServices)
  const [extraServices, setExtraServices] =
    useState<Service[]>(defaultExtraServices)
  const [customService, setCustomService] = useState("")
  const [activeTab, setActiveTab] = useState<"base" | "extra">("base")

  useEffect(() => {
    if (profile?.baseServices) {
      const updatedBaseServices = defaultBaseServices.map(service => ({
        ...service,
        isOffered: profile?.baseServices?.includes(service.name),
      }))
      const baseCustomServices = profile.baseServices
        .filter(
          service =>
            !defaultBaseServices.some(
              defaultService => defaultService.name === service,
            ),
        )
        .map(service => ({
          name: service,
          isOffered: true,
          isCustom: true,
        }))
      setBaseServices([...updatedBaseServices, ...baseCustomServices])
    }
    if (profile?.extraServices) {
      const extraCustomServices = profile.extraServices.map(service => ({
        name: service.replace("Extra: ", ""),
        isOffered: true,
        isCustom: true,
      }))
      setExtraServices(extraCustomServices)
    }
  }, [profile])

  useEffect(() => {
    console.log("JUN activeTab", activeTab)
  }, [activeTab])

  const handleServiceToggle = (index: number, isBase: boolean) => {
    const services = isBase ? baseServices : extraServices
    const setServices = isBase ? setBaseServices : setExtraServices
    const updatedServices = [...services]
    updatedServices[index].isOffered = !updatedServices[index].isOffered
    setServices(updatedServices)
  }

  const handleAddCustomService = () => {
    if (customService.trim()) {
      const newService = {
        name: customService.trim(),
        isOffered: true,
        isCustom: true,
      }
      if (activeTab === "base") {
        setBaseServices([...baseServices, newService])
      } else {
        setExtraServices([...extraServices, newService])
      }
      setCustomService("")
    }
  }

  const handleDeleteCustomService = (index: number, isBase: boolean) => {
    const services = isBase ? baseServices : extraServices
    const setServices = isBase ? setBaseServices : setExtraServices
    const updatedServices = services.filter((_, i) => i !== index)
    setServices(updatedServices)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const offeredBaseServices = baseServices
      .filter(service => service.isOffered)
      .map(service => service.name)
    const offeredExtraServices = extraServices
      .filter(service => service.isOffered)
      .map(service => `Extra: ${service.name}`)
    onUpdate({
      baseServices: offeredBaseServices,
      extraServices: offeredExtraServices,
    })
  }

  const renderServiceList = (services: Service[], isBase: boolean) => (
    <div className="space-y-2 flex flex-wrap gap-x-2">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-100 p-2 rounded"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`service-${isBase ? "base" : "extra"}-${index}`}
              checked={service.isOffered}
              onChange={() => handleServiceToggle(index, isBase)}
              className="mr-2 form-checkbox h-5 w-5 text-accent rounded focus:ring-accent"
            />
            <label
              htmlFor={`service-${isBase ? "base" : "extra"}-${index}`}
              className="text-primary text-sm"
            >
              {service.name}
            </label>
          </div>
          {service.isCustom && (
            <button
              onClick={() => handleDeleteCustomService(index, isBase)}
              className="text-red-500 hover:text-red-600 transition-colors"
              aria-label="Delete service"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div className="vogue-container">
      <h2 className="vogue-heading text-2xl mb-6">Services Offered</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex space-x-2 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab("base")}
            className={`vogue-button flex-1 ${activeTab === "base" ? "vogue-button-active" : ""}`}
          >
            Base Services
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("extra")}
            className={`vogue-button flex-1 ${activeTab === "extra" ? "vogue-button-active" : ""}`}
          >
            Extra Services
          </button>
        </div>

        {activeTab === "base"
          ? renderServiceList(baseServices, true)
          : renderServiceList(extraServices, false)}

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="text"
            value={customService}
            onChange={e => setCustomService(e.target.value)}
            placeholder={`Add custom ${activeTab} service`}
            className="vogue-input flex-grow"
          />
          <button
            type="button"
            onClick={handleAddCustomService}
            className="vogue-button-secondary p-2"
            disabled={
              (activeTab === "base" && baseServices.length >= 30) ||
              (activeTab === "extra" && extraServices.length >= 20)
            }
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
        {((activeTab === "base" && baseServices.length >= 30) ||
          (activeTab === "extra" && extraServices.length >= 20)) && (
          <p className="text-red-500 mt-2">Maximum services reached</p>
        )}

        <button type="submit" className="vogue-button w-full">
          Save Services
        </button>
      </form>
    </div>
  )
}

export default ServiceSection
