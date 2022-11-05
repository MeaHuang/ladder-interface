import { Box, Typography, useTheme, Button, styled, Stack, Link } from '@mui/material'
import { ExternalLink } from 'theme/components'
import { useIsDarkMode } from 'state/user/hooks'
import BgLight from 'assets/images/bg_light.png'
import BgDark from 'assets/images/bg_dark.png'
import useBreakpoint from 'hooks/useBreakpoint'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useActiveWeb3React } from 'hooks'
import { ClaimState, useTestnetClaim } from 'hooks/useTestnetClaim'
import ActionButton from 'components/Button/ActionButton'
import { Socials } from 'constants/socialLinks'
import Image from 'components/Image'
import { isAddress } from 'utils'
import Collapse from 'components/Collapse'
import Input from 'components/Input'
import ClaimableItem from './ClaimableItem'
import TaskBox from './TaskItem'
import { Timer } from 'components/Timer'
import { useMemo, useState } from 'react'
import { Token } from 'constants/token'
import { ChainId } from 'constants/chain'
import { ReactComponent as Explore } from 'assets/svg/explore.svg'

const StyledButtonWrapper = styled(Box)(({ theme }) => ({
  maxWidth: 400,
  width: '100%',
  '& button': {
    maxWidth: 400,
    width: '100%',
    height: 50,
    fontSize: 16,
    padding: 0,
    [theme.breakpoints.down('md')]: {
      height: 70,
      fontSize: 16,
      padding: '16px 40px'
    }
  }
}))

const StyledCardWrapper = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.color.color1}`,
  borderRadius: '16px',
  padding: '30px 28px',
  [theme.breakpoints.down('md')]: {
    padding: '16px'
  }
}))

const RowBetween = styled(Box)(({}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}))

const StyledQATitle = styled(Box)(({ theme }) => ({
  fontSize: 20,
  marginBottom: 16,
  [theme.breakpoints.down('md')]: {
    fontSize: 16
  }
}))

const StyledQABody = styled(Box)(({ theme }) => ({
  fontSize: 20,
  color: theme.palette.text.secondary,
  [theme.breakpoints.down('md')]: {
    fontSize: 16
  }
}))

const faucetTokens = [
  {
    token: new Token(
      ChainId.GÖRLI,
      '0x0F85225ab45b77DA055c5B5f9e5F4F919A1D17EA',
      18,
      'tWETH',
      'testETH-LadderV2-ETH-Testnet'
    ),
    amount: '100'
  },
  {
    token: new Token(
      ChainId.GÖRLI,
      '0x314195C69d8F0236939a31f64cB367764672CA0f',
      18,
      'tUSDC',
      'testUSDC-LadderV2-USDC-Testnet '
    ),
    amount: '100,000'
  }
]

const activeTimeStamp = [1666238460000, 1666843140000]

export default function Testnet() {
  const theme = useTheme()
  const isDarkMode = useIsDarkMode()
  const isDownSm = useBreakpoint('sm')
  const toggleWalletModal = useWalletModalToggle()
  const { account } = useActiveWeb3React()
  const { testnetClaim, claimState } = useTestnetClaim(account || undefined)
  const [queryAddress, setQueryAddress] = useState('')
  const { claimState: queryClaimState } = useTestnetClaim(isAddress(queryAddress) ? queryAddress : undefined)

  // const qaTableData = [
  //   [
  //     'SBT Holder (ETH Mergee)',
  //     'Merge SOUve SBT',
  //     '',
  //     <Link
  //       key={0}
  //       sx={{
  //         wordBreak: 'break-all',
  //         color: theme.palette.text.primary,
  //         textDecorationColor: theme.palette.text.primary
  //       }}
  //       target="_blank"
  //       href="https://app.quest3.xyz/event/12514312412"
  //     >
  //       https://app.quest3.xyz/event/12514312412
  //     </Link>
  //   ],
  //   ['', 'Platinum GENESIS SBT', '', ''],
  //   ['', 'Platinum FINALITY SBT', '', ''],
  //   [
  //     'SBT Holder (Ladder Testnet-MUADAO)',
  //     'Ladder Testnet SBT',
  //     '1657',
  //     <Link
  //       key={0}
  //       sx={{
  //         wordBreak: 'break-all',
  //         color: theme.palette.text.primary,
  //         textDecorationColor: theme.palette.text.primary
  //       }}
  //       target="_blank"
  //       href="https://app.quest3.xyz/event/12514312412"
  //     >
  //       https://app.quest3.xyz/event/12514312412
  //     </Link>
  //   ],
  //   ['NFT Bluechip + Hot Project Holder', 'Bluechip NFT', '', 'BAYC / MAYC / CRYPTOPUNK / MOONBIRDS / AZUKI / DOODLES'],
  //   ['', 'Top 10 ETH gas burning projects', '', ''],
  //   ['Gleam Airdrops', 'Gleam #1', '', ''],
  //   ['', 'Gleam #2', '', ''],
  //   ['Partners Whitelist', '[TBD]', '', '']
  // ]

  const queryNotice = useMemo(() => {
    return (
      <>
        {queryAddress && ClaimState.UNKNOWN !== queryClaimState && (
          <Box mt={10}>
            {queryClaimState === ClaimState.NOT_REGISTERED ? (
              <Typography textAlign={isDownSm ? 'center' : 'left'} color={theme.palette.error.main} fontWeight={500}>
                Oops! Unfortunately, you are not eligible for this test, but you can stay tuned for our follow-up
                activities.
              </Typography>
            ) : (
              <Typography textAlign={isDownSm ? 'center' : 'left'} color={theme.palette.info.main} fontWeight={500}>
                Congratulations! Because you are{' '}
                <Link
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.info.main,
                    textDecorationColor: theme.palette.info.main
                  }}
                >
                  the holder of Platinum GENESIS SBT
                </Link>
                , you can continue to participate in this beta event!
              </Typography>
            )}
          </Box>
        )}
      </>
    )
  }, [isDownSm, queryAddress, queryClaimState, theme.palette.error.main, theme.palette.info.main])

  const activeTimeStatus = useMemo(() => {
    const curTime = new Date().getTime()
    if (curTime < activeTimeStamp[0]) {
      return 'soon'
    } else if (curTime >= activeTimeStamp[0] && curTime < activeTimeStamp[1]) {
      return 'active'
    }
    return 'end'
  }, [])

  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          // width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 36,
          // pt: theme.height.header,
          // pb: 120,
          padding: `${theme.height.header} 16px 120px`,
          pt: 120,
          backgroundImage: `url(${isDarkMode ? BgDark : BgLight})`,
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: 20,
              md: 45
            },
            fontWeight: 700,
            textAlign: 'center',
            maxWidth: 1200
          }}
        >
          Providing liquidity for your NFT swaps
        </Typography>
        <Typography
          sx={{
            fontSize: {
              xs: 16,
              md: 20
            },
            fontWeight: 500,
            textAlign: 'center',
            maxWidth: 900
          }}
        >
          Ladder Protocol a decentralized NFT AMM,enabling instantd NFT swaps and better price discovery. In fact,
          Ladder is the first protocol that allows you to Swap an NFT as easily as swapping a Token.
        </Typography>
        <Typography mt={60}>Want to know about Ladder Testnet or Mining, Airdrop? Come and discuss</Typography>
        <Box>
          <Stack direction={'row'} spacing={31}>
            {Object.keys(Socials).map((key, idx) => {
              return (
                <ExternalLink
                  key={idx}
                  href={Socials[key as keyof typeof Socials].link}
                  sx={{
                    transform: 'rotate3d(0)',
                    '&:hover': {
                      transform: 'rotate3d(0,1,0,180deg)'
                    }
                  }}
                >
                  <Image
                    src={Socials[key as keyof typeof Socials].logo1}
                    alt={`social-media-link-${Socials[key as keyof typeof Socials].title}-bg`}
                    style={{
                      width: isDownSm ? 50 : 60
                    }}
                  />
                </ExternalLink>
              )
            })}
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          height: '100%',
          background: theme.palette.background.paper,
          padding: {
            xs: '42px 16px 114px',
            md: '70px 45px 40px'
          }
        }}
      >
        <Stack
          spacing={40}
          sx={{
            width: '100%',
            maxWidth: '1144px',
            margin: 'auto'
          }}
        >
          <StyledCardWrapper>
            <Collapse
              defaultOpen
              title={
                <RowBetween flexWrap={'wrap'}>
                  <Box display={'flex'} flexWrap={'wrap'}>
                    <Typography fontSize={16} fontWeight={600} color={theme.palette.info.main} mr={12}>
                      Round 1
                    </Typography>
                    <Typography fontSize={16} sx={{ mt: { xs: 6, sm: 0 } }} fontWeight={600}>
                      Ladder ETH Main Testnet-Round 1
                    </Typography>
                  </Box>
                  <Typography fontSize={16} sx={{ mt: { xs: 6 } }} fontWeight={600}>
                    {activeTimeStatus === 'soon' ? (
                      <>
                        Distance to start: <Timer timer={activeTimeStamp[0]} />
                      </>
                    ) : activeTimeStatus === 'active' ? (
                      <>
                        Distance to end: <Timer timer={activeTimeStamp[1]} />
                      </>
                    ) : (
                      'End'
                    )}
                  </Typography>
                </RowBetween>
              }
            >
              <Stack mt="56px" spacing={56}>
                <Box>
                  <RowBetween flexWrap={'wrap'}>
                    <StepTitle step={1} title="Verify Eligibility" />
                  </RowBetween>
                  <Box
                    mt={28}
                    display="grid"
                    sx={{
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 182px 350px' },
                      alignItems: 'center'
                    }}
                    gap="12px"
                  >
                    <Input
                      value={queryAddress}
                      onChange={e => setQueryAddress(e.target.value)}
                      onBlur={() => {
                        if (!isAddress(queryAddress)) setQueryAddress('')
                      }}
                      height="52px"
                      placeholder="Please enter your address"
                    />
                    {isDownSm && queryNotice}
                    <Button
                      variant="outlined"
                      sx={{
                        height: 52,
                        borderColor: theme => theme.palette.info.main,
                        color: theme => theme.palette.info.main
                      }}
                    >
                      Check eligibility
                    </Button>
                    <Link
                      target={'_blank'}
                      href="https://medium.com/@ladder_top/ladder-amm-protocol-testnet-rules-11176931e576"
                      sx={{
                        textAlign: 'center',
                        color: theme.palette.text.primary,
                        textDecorationColor: theme.palette.text.primary
                      }}
                    >
                      View Testnet Participant Qualification
                    </Link>
                  </Box>
                  {!isDownSm && queryNotice}
                </Box>

                <Box>
                  <RowBetween>
                    <StepTitle step={2} title="Claim Test Asset" />
                  </RowBetween>
                  <Box>
                    <Box
                      mt={28}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '5fr 5fr 1.6fr' },
                        alignItems: 'center',
                        gap: { xs: '10px', sm: '24px 10px' },
                        padding: '20px',
                        backgroundColor: theme.palette.background.default,
                        borderRadius: theme.shape.borderRadius + 'px'
                      }}
                    >
                      {faucetTokens.map((item, index) => (
                        <ClaimableItem
                          key={index}
                          token={item.token}
                          amount={item.amount}
                          claimable={claimState === ClaimState.UNCLAIMED ? item.amount : '0'}
                        />
                      ))}
                      <ClaimableItem
                        nftInfo={{ name: 'laddertest-erc1155' }}
                        amount={'5'}
                        claimable={claimState === ClaimState.UNCLAIMED ? '5' : '0'}
                      />
                      <ClaimableItem
                        nftInfo={{ name: 'laddertest-erc721' }}
                        amount={'20'}
                        claimable={claimState === ClaimState.UNCLAIMED ? '20' : '0'}
                      />
                    </Box>
                    <Box display={'flex'} flexDirection="row-reverse" mt={16} alignItems="center">
                      <StyledButtonWrapper>
                        {account ? (
                          <StyledButtonWrapper>
                            <ActionButton
                              pending={claimState === ClaimState.UNKNOWN}
                              onAction={testnetClaim}
                              actionText="Claim your test assets"
                              error={
                                claimState === ClaimState.UNCLAIMED
                                  ? undefined
                                  : claimState === ClaimState.CLAIMED
                                  ? 'Test assets Claimed'
                                  : 'Address not registered'
                              }
                            />
                          </StyledButtonWrapper>
                        ) : (
                          <StyledButtonWrapper>
                            <Button onClick={toggleWalletModal}>Connect the wallet to claim your test assets</Button>
                          </StyledButtonWrapper>
                        )}
                      </StyledButtonWrapper>
                      <Box margin="0 15px">
                        <Link
                          display={'flex'}
                          alignItems="center"
                          fontWeight={600}
                          href="https://faucet.paradigm.xyz/ "
                          target={'_blank'}
                        >
                          Goerli Faucet
                          <Explore />
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <StepTitle step={3} title="Complete testnet tasks" />
                  <Stack spacing={12} mt={28}>
                    <TaskBox />
                  </Stack>
                </Box>
              </Stack>
            </Collapse>
          </StyledCardWrapper>

          <StyledCardWrapper>
            <Collapse
              defaultOpen
              title={
                <RowBetween flexWrap="wrap">
                  <Box display={'flex'} flexWrap="wrap">
                    <Typography fontSize={16} fontWeight={600} color={theme.palette.info.main} mr={12}>
                      Round 2
                    </Typography>
                    <Typography fontSize={16} sx={{ mt: { xs: 6, sm: 0 } }} fontWeight={600}>
                      Ladder ETH Main Testnet-Round 2
                    </Typography>
                  </Box>
                  <Typography sx={{ mt: { xs: 6 } }} fontSize={16} fontWeight={600}>
                    coming soon
                  </Typography>
                </RowBetween>
              }
            >
              <Typography
                fontSize={16}
                mt={38}
                textAlign="center"
                color={theme.palette.text.secondary}
                fontWeight={600}
              >
                We have more plans in the works, so stay tuned!
              </Typography>
            </Collapse>
          </StyledCardWrapper>

          <StyledCardWrapper>
            <Collapse
              defaultOpen
              title={
                <RowBetween>
                  <Box display={'flex'}>
                    <Typography fontSize={16} fontWeight={600} color={theme.palette.info.main} mr={12}>
                      Q&A
                    </Typography>
                  </Box>
                </RowBetween>
              }
            >
              <Stack spacing={44}>
                <Box mt={56}>
                  <StyledQATitle>1. What is Ladder?</StyledQATitle>
                  {/* <Table
                  fontSize="15px"
                  header={['Qualification', 'Source', 'Number', 'Note']}
                  rows={qaTableData}
                ></Table> */}
                  <StyledQABody>
                    {`Ladder is a unique AMM (Automated Market Maker) that will provide instant liquidity for NFT's
                    including ERC-20, ERC-721, ERC-1155. Unlike other NFT marketplaces which operate on an order book
                    style of exchange, Ladder protocol takes a different approach by using Automated Market Makers and
                    limit orders. By doing so, we aim to provide instant swaps for NFTs with low slippage and low fees!`}
                    <br />
                    <br />
                    {`On Ladder, now you can see how much certainty your NFT is backed by, or you can buy any NFT in the
                    Pool, achieve arbitrage between the NFT AMM Pool and the floor price in other markets, or earn a
                    commission for providing liquidity to your NFT. Ladder builds an infinite door for NFT'S!`}
                  </StyledQABody>
                </Box>
                <Box>
                  <StyledQATitle>2. Who can participate in the Round 1 Testnet?</StyledQATitle>
                  <StyledQABody>
                    Participants for Ladder Testnet will include: Holders of the Ladder ETH Merge SBT Holders of the
                    MUADAO Ladder Testnet SBT NFT Bluechip + Hot Project Holders Holders of the Gleam Ladder Testnet
                    Airdrops.
                  </StyledQABody>
                </Box>
                <Box>
                  <StyledQATitle>3. What happens after Round 1 Testnet?</StyledQATitle>
                  <StyledQABody>
                    After round 1 of Testnet is completed, participants who completed their testing of round 1 Ladder
                    Testnet results of participants will be taken into account. We will follow up with Testnet round 2
                    in the near future. Pay attention to our Twitter account for opportunities to participate in round 2
                    of ladder testnet.
                  </StyledQABody>
                </Box>
                <Box>
                  <StyledQATitle>4. Where can I see upcoming events?</StyledQATitle>
                  <StyledQABody>
                    <Box>
                      Twitter:{' '}
                      <Link target={'_blank'} href="https://twitter.com/Laddertop_NFT">
                        https://twitter.com/Laddertop_NFT
                      </Link>
                    </Box>
                    <Box>
                      Link3:{' '}
                      <Link target={'_blank'} href="https://link3.to/ladder">
                        https://link3.to/ladder
                      </Link>
                    </Box>
                    <Box>
                      Discord:{' '}
                      <Link target={'_blank'} href="https://discord.gg/sabGRPhwUM">
                        https://discord.gg/sabGRPhwUM
                      </Link>
                    </Box>
                  </StyledQABody>
                </Box>
              </Stack>
            </Collapse>
          </StyledCardWrapper>
        </Stack>
      </Box>
    </Box>
  )
}

function StepTitle({ title, step }: { step: number | string; title: string }) {
  const theme = useTheme()
  return (
    <Box display={'flex'}>
      <Typography fontSize={16} fontWeight={600} color={theme.palette.text.secondary} mr={12}>
        Step {step}
      </Typography>
      <Typography fontSize={16} fontWeight={600}>
        {title}
      </Typography>
    </Box>
  )
}
