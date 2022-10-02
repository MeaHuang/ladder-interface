import { Box, useTheme, IconButton, styled, Typography } from '@mui/material'
import { ReactComponent as Twitter } from 'assets/svg/socials/twitter.svg'
import { ReactComponent as Discord } from 'assets/svg/socials/discord.svg'
import { ReactComponent as Website } from 'assets/svg/socials/website.svg'
import { ExternalLink } from 'theme/components'
import { ExternalLinks } from 'constants/external_links'
import Card from 'components/Card'
import Carousel from 'components/Carousel'
import { useIsDarkMode } from 'state/user/hooks'
import BgLight from 'assets/images/bg_light.png'
import BgDark from 'assets/images/bg_dark.png'

export default function Explore() {
  const theme = useTheme()
  const isDarkMode = useIsDarkMode()
  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        background: theme.palette.background.paper,
        backgroundSize: '100% 100%'
      }}
    >
      <Box
        sx={{
          padding: {
            xs: 0,
            md: '60px 0px 0px 45px'
          },
          display: 'flex',
          gap: 32,
          justifyContent: 'space-between',

          flexDirection: {
            xs: 'column',
            md: 'row'
          }
        }}
      >
        <Box sx={{ maxWidth: 724, width: '100%', padding: { xs: '20px 15px', md: 0 } }}>
          <SocilaMediaGroup />
          <Typography variant="h1" sx={{ mt: 40 }}>
            Incredible liquidity pool! Quickly find real-time value of NFTs.
          </Typography>
          <Box sx={{ display: 'flex', gap: 20, mt: 48, flexDirection: { xs: 'column', md: 'row' } }}>
            <Card padding="28px 24px" light width={320}>
              <Typography variant="h5" sx={{ fontSize: 24, fontWeight: 700 }}>
                $1,732,654,325
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 400, mt: 16, color: theme.palette.text.secondary }}>
                Total Liquidity
              </Typography>
            </Card>
            <Card padding="28px 24px" light width={320}>
              <Typography variant="h5" sx={{ fontSize: 24, fontWeight: 700 }}>
                $1,732,654,325
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 400, mt: 16, color: theme.palette.text.secondary }}>
                Volume(24hrs)
              </Typography>
            </Card>
          </Box>
        </Box>
        <Box
          sx={{
            padding: '20px 0 48px',
            borderRadius: { xs: 0, md: '48px 0 0 0' },
            backgroundImage: `url(${isDarkMode ? BgDark : BgLight})`,
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              width: 'fit-content',
              fontSize: 16,
              fontWeight: 700,
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              marginLeft: 'auto',
              marginRight: 20,
              padding: 14,
              mb: 24
            }}
          >
            Popular Collection
          </Box>
          <Carousel />
        </Box>
      </Box>
    </Box>
  )
}

const SocilaMediaBtn = styled(IconButton)(({ theme }) => ({
  background: theme.palette.background.default,
  borderRadius: 8,
  width: 44,
  height: 44,
  '&:hover': {
    opacity: 0.8
  }
}))

function SocilaMediaGroup() {
  return (
    <Box sx={{ display: 'flex', gap: 20 }}>
      <ExternalLink href={ExternalLinks.twitter}>
        <SocilaMediaBtn>
          <Twitter />
        </SocilaMediaBtn>
      </ExternalLink>
      <ExternalLink href={ExternalLinks.discord}>
        <SocilaMediaBtn>
          <Discord />
        </SocilaMediaBtn>
      </ExternalLink>
      <ExternalLink href={ExternalLinks.website}>
        <SocilaMediaBtn>
          <Website />
        </SocilaMediaBtn>
      </ExternalLink>
    </Box>
  )
}
