# Aivilization AI Simulation Integration

## Overview

Aivilization has been successfully integrated into QueensGame as an external game. This integration provides users with access to the world's largest AI multi-agent social simulation experiment.

## Game Information

- **Title**: Aivilization
- **Developer**: Hong Kong University of Science and Technology (HKUST)
- **Category**: AI Simulation
- **Type**: External Game (redirects to official site)
- **Rating**: 4.9/5.0
- **Participants**: 15,000+

## Game Features

- **100,000 AI Agents**: Massive multi-agent social simulation
- **Digital Twin Creation**: Create your AI avatar with custom background and values
- **Emergent Society**: Rules evolve naturally from bottom-up interactions
- **Trust Network Research**: Study how trust emerges in digital societies
- **Future Society Rehearsal**: Prepare for the "Mirror World" concept

## Technical Integration

### Files Modified

1. **`src/types/Game.ts`**
   - Added `external?: boolean` property
   - Added `invitationCodes?: string[]` property
   - Extended `provider` type to include `'external'`

2. **`src/data/gameData.ts`**
   - Added `aivilizationGame` object with complete game data
   - Includes invitation codes: `['1ZbKep9Q', '8V2BHiLT', 'vtLbDGh5']`

3. **`src/pages/AivilizationPage.tsx`** (New)
   - Dedicated page component for Aivilization
   - Features game description, invitation codes, and research information
   - Includes copy-to-clipboard functionality for invitation codes
   - Maintains consistent design with QueensGame theme

4. **`src/App.tsx`**
   - Added Aivilization to game list (featured position)
   - Added routing for `/games/aivilization`
   - Updated game card display to show "EXTERNAL" badge for external games

5. **`scripts/generateSitemap.js`**
   - Added Aivilization page to sitemap generation
   - High priority (0.9) for SEO optimization

### Assets

- **Image**: `/public/img/Aivilization.png` - Game cover image
- **Path**: Accessible at `/img/Aivilization.png`

## User Experience

### Homepage Integration
- Aivilization appears as the first featured game on the homepage
- Displays "EXTERNAL" badge to indicate it's an external game
- Maintains consistent card design with other games

### Dedicated Page
- **URL**: `/games/aivilization`
- **Features**:
  - Game cover image with hover effect
  - Detailed game description
  - Feature highlights (100K AI Agents, Digital Twin, Emergent Society)
  - Invitation codes with copy functionality
  - Research project information
  - Direct link to official site

### Navigation
- Users can click on the game card to access the dedicated page
- "Play Aivilization" button opens the official site in a new tab
- Back button returns to the game grid

## SEO Optimization

- **Sitemap**: Included in sitemap.xml with high priority
- **Meta Tags**: Proper title and description for search engines
- **URL Structure**: Clean, SEO-friendly URL `/games/aivilization`
- **Content**: Rich, descriptive content for better search rankings

## Research Context

Aivilization represents a significant research project exploring:
- AI multi-agent social dynamics
- Emergent trust networks
- Future human-AI coexistence
- Digital society simulation

This integration aligns with QueensGame's mission to provide cutting-edge gaming experiences while supporting academic research initiatives.

## Maintenance

### Updates
- Monitor for new invitation codes
- Update game statistics as they change
- Keep research information current

### Monitoring
- Track user engagement with the Aivilization page
- Monitor click-through rates to the official site
- Ensure invitation codes remain valid

## Future Enhancements

Potential improvements for the Aivilization integration:
- Add user testimonials or reviews
- Include research updates and findings
- Add related AI simulation games
- Create a dedicated AI games category

---

**Last Updated**: 2025-08-30
**Integration Status**: Complete and Live
**Position**: Featured at the top of the game list (newest)
**Next Review**: 2025-09-30 