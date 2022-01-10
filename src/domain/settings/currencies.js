import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Box, Flex } from "rebass"
import BreadCrumb from "../../components/breadcrumb"
import MultiSelect from "../../components/multi-select"
import BodyCard from "../../components/organisms/body-card"
import Select from "../../components/select"
import TwoSplitPane from "../../components/templates/two-split-pane"
import Typography from "../../components/typography"
import useMedusa from "../../hooks/use-medusa"
import { currencies } from "../../utils/currencies"
import { getErrorMessage } from "../../utils/error-messages"

const StyledMultiSelect = styled(MultiSelect)`
  ${Typography.Base}

  color: black;
  background-color: white;

  width: 150px;

  line-height: 1.22;

  border: none;
  outline: 0;

  transition: all 0.2s ease;

  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px;

  &:focus: {
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(206, 208, 190, 0.36) 0px 0px 0px 4px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px;
  }
  &::placeholder: {
    color: #a3acb9;
  }

  .go3433208811 {
    border: none;
    border-radius: 3px;
  }
`

const AccountDetails = () => {
  const [selectedCurrencies, setCurrencies] = useState([])
  const { register, setValue, handleSubmit } = useForm()
  const { store, isLoading, update, toaster } = useMedusa("store")

  useEffect(() => {
    if (isLoading || !store) return
    setValue("default_currency_code", store.default_currency_code.toUpperCase())
    setCurrencies(
      store.currencies
        ? store.currencies.map(c => ({
            value: c.code.toUpperCase(),
            label: c.code.toUpperCase(),
          }))
        : []
    )
  }, [store, isLoading])

  const options = Object.keys(currencies).map(k => {
    return {
      value: k,
      label: k,
    }
  })

  const handleChange = currencies => {
    setCurrencies(currencies)
  }

  const onSubmit = data => {
    try {
      update({
        default_currency_code: data.default_currency_code,
        currencies: selectedCurrencies.map(c => c.value),
      })
      toaster("Successfully updated currencies", "success")
    } catch (error) {
      toaster(getErrorMessage(error), "error")
    }
  }

  return (
    <Flex
      as="form"
      flexDirection={"column"}
      onSubmit={handleSubmit(onSubmit)}
      pb={5}
      pt={5}
    >
      <BreadCrumb
        previousRoute="/a/settings"
        previousBreadCrumb="Settings"
        currentPage="Currencies"
      />
      <TwoSplitPane>
        <BodyCard
          title="Currencies"
          subtitle="Manage the currencies that you will operate in"
          actionables={[]}
        >
          <Flex width={1} flexDirection="column">
            <Box mb={3} width={1 / 4}>
              <Select
                width="300px"
                label="Default store currency"
                name="default_currency_code"
                options={options}
                ref={register}
              />
            </Box>
            <Box width={1 / 4}>
              <MultiSelect
                start={true}
                mb={3}
                label="Store currencies"
                selectOptions={{ hasSelectAll: false }}
                options={Object.keys(currencies).map(currency => ({
                  label: currency,
                  value: currency,
                }))}
                value={selectedCurrencies}
                onChange={handleChange}
              />
            </Box>
          </Flex>
        </BodyCard>
      </TwoSplitPane>
      {/* <Card px={0}> */}
      {/* <Flex>
          <Text mb={3} fontSize={20} fontWeight="bold">
            Currencies
          </Text>
          <Box ml="auto" />
        </Flex>
        <Card.Body>
          {isLoading ? (
            <Flex
              flexDirection="column"
              alignItems="center"
              height="100vh"
              mt="auto"
            >
              <Box height="75px" width="75px" mt="50%">
                <Spinner dark />
              </Box>
            </Flex>
          ) : (
            <Flex width={1} flexDirection="column">
              <Box mb={3} width={1 / 4}>
                <Select
                  width="300px"
                  label="Default store currency"
                  name="default_currency_code"
                  options={options}
                  ref={register}
                />
              </Box>
              <Box width={1 / 4}>
                <MultiSelect
                  start={true}
                  mb={3}
                  label="Store currencies"
                  selectOptions={{ hasSelectAll: false }}
                  options={Object.keys(currencies).map(currency => ({
                    label: currency,
                    value: currency,
                  }))}
                  value={selectedCurrencies}
                  onChange={handleChange}
                />
              </Box>
            </Flex>
          )}
        </Card.Body>
        <Card.Footer justifyContent="flex-start">
          <Button mr={3} type="submit" fontWeight="bold" variant="cta">
            Save
          </Button>
        </Card.Footer>
      </Card> */}
    </Flex>
  )
}

export default AccountDetails
