import type React from "react"
import { useCallback, useState } from "react"
import { httpsCallable } from "firebase/functions"
import { debounce } from "lodash"
import { functions } from "../../../../firebase/config"
import type { Address } from "../../../../types"
import AsyncSelect from "react-select/async"

interface AddressAutoFillComponentProps {
  address: Address
  onSetAddress: (address: Address) => void
}

const AddressAutoFillComponent: React.FC<AddressAutoFillComponentProps> = (
  props: AddressAutoFillComponentProps,
) => {
  const { address, onSetAddress } = props

  // Use debounce to delay API call
  const debouncedLoadOptions = useCallback(
    debounce((inputValue, callback) => {
      fetchOptions(inputValue).then(callback)
    }, 1000), // Adjust the debounce delay (500ms here)
    [],
  )

  const fetchOptions = async (query: string) => {
    const getAddressAutofill = httpsCallable(
      functions,
      "mapBox-getAddressAutofill",
    )
    const result = await getAddressAutofill({ query })
    const data = result.data

    if ((data as any).features && (data as any).features.length > 0) {
      return (data as any).features.map((item: any) => ({
        value: {
          address: item.place_name,
          city: item.context?.find((c: any) => c.id.includes("place"))?.text,
          state: item.context?.find((c: any) => c.id.includes("region"))?.text,
          postcode: item.context?.find((c: any) => c.id.includes("postcode"))
            ?.text,
          longitude: item.center[0],
          latitude: item.center[1],
        },
        label: item.place_name,
      }))
    }

    return []
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onSetAddress({ ...address, [name]: value })
  }

  const handleSelectChange = (selectedOption: any) => {
    onSetAddress(selectedOption.value)
  }

  return (
    <div>
      <div>
        <label htmlFor="address" className="vogue-subheading block mb-2">
          *Address
          <span className="text-sm lowercase tracking-tight">
            (It won't be displayed publicly)
          </span>
        </label>
        <AsyncSelect
          cacheOptions
          isClearable
          loadOptions={debouncedLoadOptions}
          onChange={handleSelectChange}
          placeholder="Start typing a location..."
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        <div className="flex-grow min-w-40 max-w-80 ">
          <input
            id="apartment"
            name="apartment"
            type="text"
            value={address?.apartment}
            onChange={handleChange}
            className="vogue-input w-full bg-gray-100"
            placeholder="Apartment or suite number"
          />
        </div>

        <div className="flex-grow min-w-40 max-w-80 ">
          <input
            id="city"
            name="city"
            type="text"
            value={address?.city}
            className="vogue-input w-full bg-gray-100"
            placeholder="City or locality"
            readOnly
          />
        </div>

        <div className="flex-grow min-w-40 max-w-80 ">
          <input
            id="state"
            name="state"
            type="text"
            value={address?.state}
            className="vogue-input w-full bg-gray-100"
            placeholder="State or region"
            readOnly
          />
        </div>

        <div className="flex-grow min-w-40 max-w-80 ">
          <input
            id="postcode"
            name="postcode"
            type="text"
            value={address?.postcode}
            className="vogue-input w-full bg-gray-100"
            placeholder="Postcode"
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

export default AddressAutoFillComponent
