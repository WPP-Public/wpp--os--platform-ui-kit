# WppExpandableCard - Lazy Loading Documentation

## Overview

The `wpp-expandable-card` component supports lazy loading of content to improve performance when rendering multiple cards on a page. This is achieved by conditionally rendering the card content based on the expansion state using the existing `onWppChange` event.

## Benefits

- ✅ Improved initial page load performance
- ✅ Reduced memory usage
- ✅ Better user experience with many cards
- ✅ No changes to existing component API

## Implementation

### React

```tsx
import { useState } from 'react'
import { WppExpandableCard } from '@wppopen/components-library-react'
import { ExpandableCardSectionChangeEventDetail } from '@wppopen/components-library'

interface DynamicContent {
  [key: string]: any
  error?: string
}

interface LoadedContentState {
  [key: number]: DynamicContent
}

interface LoadingState {
  [key: number]: boolean
}

interface Card {
  id: number
  title: string
  endpoint: string
  image?: React.ReactNode
}

// Component to render different types of dynamic content
export const DynamicContentRenderer = ({ data }: { data: DynamicContent }) => (
  <div>
    {Object.entries(data).map(([key, value]) => (
      <div key={key} className="content-item">
        <strong>{key}:</strong> {JSON.stringify(value)}
      </div>
    ))}
  </div>
)

// List of Expandable Cards with Dynamic Content
export const ExpandableCardVC = () => {
  const [loadedContent, setLoadedContent] = useState<LoadedContentState>({})
  const [loadingStates, setLoadingStates] = useState<LoadingState>({})

  // Sample data - could come from API
  const cards: Card[] = [
    {
      id: 1,
      title: 'User Profile Details',
      endpoint: '/api/users/1',
      image: (
        <img
          src={`https://placehold.co/400x200?text=User+Profile`}
          alt={'User Profile'}
          style={{ width: '100%', borderRadius: '8px' }}
        />
      ),
    },
    {
      id: 2,
      title: 'Order History',
      endpoint: '/api/orders/1',
      image: (
        <img
          src={`https://placehold.co/400x200?text=Order+History`}
          alt={'Order History'}
          style={{ width: '100%', borderRadius: '8px' }}
        />
      ),
    },
    {
      id: 3,
      title: 'Payment Methods',
      endpoint: '/api/payments/1',
      image: (
        <img
          src={`https://placehold.co/400x200?text=Payment+Methods`}
          alt={'Payment Methods'}
          style={{ width: '100%', borderRadius: '8px' }}
        />
      ),
    },
    {
      id: 4,
      title: 'Shipping Addresses',
      endpoint: '/api/addresses/1',
      image: (
        <img
          src={`https://placehold.co/400x200?text=Shipping+Addresses`}
          alt={'Shipping Addresses'}
          style={{ width: '100%', borderRadius: '8px' }}
        />
      ),
    },
    {
      id: 5,
      title: 'Preferences & Settings',
      endpoint: '/api/settings/1',
      image: (
        <img
          src={`https://placehold.co/400x200?text=Preferences`}
          alt={'Preferences & Settings'}
          style={{ width: '100%', borderRadius: '8px' }}
        />
      ),
    },
  ]

  const loadDynamicContent = async (cardId: number, endpoint: string) => {
    setLoadingStates(prev => ({ ...prev, [cardId]: true }))

    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay

      // Mock different data for each endpoint
      const mockData: { [key: string]: any } = {
        '/api/users/1': {
          name: 'John Doe',
          email: 'john.doe@example.com',
          memberSince: '2020-01-15',
          subscription: 'Premium',
          lastLogin: '2023-08-06',
        },
        '/api/orders/1': {
          totalOrders: 24,
          lastOrder: '2023-07-28',
          totalSpent: '$1,234.56',
          averageOrderValue: '$51.44',
          favoriteCategory: 'Electronics',
        },
        '/api/payments/1': {
          defaultCard: '**** **** **** 1234',
          cardType: 'Visa',
          expiryDate: '12/25',
          billingAddress: '123 Main St, City, ST 12345',
          paymentMethods: 3,
        },
        '/api/addresses/1': {
          defaultAddress: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          totalAddresses: 2,
        },
        '/api/settings/1': {
          notifications: 'Enabled',
          newsletter: 'Subscribed',
          language: 'English',
          timezone: 'EST',
          twoFactorAuth: 'Enabled',
        },
      }

      const data = mockData[endpoint] || { message: 'No data available' }

      setLoadedContent(prev => ({
        ...prev,
        [cardId]: data,
      }))
    } catch (error) {
      setLoadedContent(prev => ({
        ...prev,
        [cardId]: { error: 'Failed to load content' },
      }))
    } finally {
      setLoadingStates(prev => ({ ...prev, [cardId]: false }))
    }
  }

  const handleCardChange =
    (cardId: number, endpoint: string) => async (event: CustomEvent<ExpandableCardSectionChangeEventDetail>) => {
      if (event.detail.expanded && !loadedContent[cardId]) {
        await loadDynamicContent(cardId, endpoint)
      }
    }

  return (
    <div className="cards-list">
      <h2>Account Information</h2>
      <p style={{ marginBottom: '24px', color: '#666' }}>
        Click on any card to load its content dynamically. Images and data are only loaded when needed.
      </p>

      {cards.map(card => (
        <WppExpandableCard
          key={card.id}
          header={card.title}
          size="l"
          onWppChange={handleCardChange(card.id, card.endpoint)}
          style={{ marginBottom: '16px' }}
        >
          {/* Show loading state */}
          {loadingStates[card.id] && (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <div className="loading-spinner">Loading content...</div>
            </div>
          )}

          {/* Show loaded content with image */}
          {loadedContent[card.id] && !loadingStates[card.id] && (
            <div className="dynamic-content" style={{ padding: '16px' }}>
              {/* Display image first */}
              {card.image && <div style={{ marginBottom: '16px' }}>{card.image}</div>}

              {/* Display content or error */}
              {loadedContent[card.id].error ? (
                <div style={{ color: 'red', padding: '16px', textAlign: 'center' }}>
                  <p>{loadedContent[card.id].error}</p>
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: '16px',
                    borderRadius: '8px',
                  }}
                >
                  <h3 style={{ marginBottom: '12px' }}>Loaded Data:</h3>
                  <DynamicContentRenderer data={loadedContent[card.id]} />
                </div>
              )}
            </div>
          )}

          {/* Show placeholder when not expanded yet */}
          {!loadedContent[card.id] && !loadingStates[card.id] && (
            <div
              style={{
                padding: '40px',
                textAlign: 'center',
                color: '#999',
                backgroundColor: '#fafafa',
                borderRadius: '8px',
              }}
            >
              <p>Click to expand and load content</p>
            </div>
          )}
        </WppExpandableCard>
      ))}
    </div>
  )
}

```

### Angular

```typescript
import { Component } from '@angular/core';

interface DynamicContent {
[key: string]: any;
error?: string;
}

interface Card {
id: number;
title: string;
endpoint: string;
imageUrl: string;
imageAlt: string;
}

@Component({
selector: 'app-expandable-card-vc',
templateUrl: './expandable-card-vc.component.html',
styleUrls: ['./expandable-card-vc.component.scss']
})
export class ExpandableCardVcComponent {
cards: Card[] = [
  {
    id: 1,
    title: 'User Profile Details',
    endpoint: '/api/users/1',
    imageUrl: 'https://placehold.co/400x200?text=User+Profile',
    imageAlt: 'User Profile'
  },
  {
    id: 2,
    title: 'Order History',
    endpoint: '/api/orders/1',
    imageUrl: 'https://placehold.co/400x200?text=Order+History',
    imageAlt: 'Order History'
  },
  {
    id: 3,
    title: 'Payment Methods',
    endpoint: '/api/payments/1',
    imageUrl: 'https://placehold.co/400x200?text=Payment+Methods',
    imageAlt: 'Payment Methods'
  },
  {
    id: 4,
    title: 'Shipping Addresses',
    endpoint: '/api/addresses/1',
    imageUrl: 'https://placehold.co/400x200?text=Shipping+Addresses',
    imageAlt: 'Shipping Addresses'
  },
  {
    id: 5,
    title: 'Preferences & Settings',
    endpoint: '/api/settings/1',
    imageUrl: 'https://placehold.co/400x200?text=Preferences',
    imageAlt: 'Preferences & Settings'
  }
];

loadedContent: { [id: number]: DynamicContent } = {};
loadingStates: { [id: number]: boolean } = {};

mockData: { [endpoint: string]: any } = {
  '/api/users/1': {
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: '2020-01-15',
    subscription: 'Premium',
    lastLogin: '2023-08-06'
  },
  '/api/orders/1': {
    totalOrders: 24,
    lastOrder: '2023-07-28',
    totalSpent: '$1,234.56',
    averageOrderValue: '$51.44',
    favoriteCategory: 'Electronics'
  },
  '/api/payments/1': {
    defaultCard: '**** **** **** 1234',
    cardType: 'Visa',
    expiryDate: '12/25',
    billingAddress: '123 Main St, City, ST 12345',
    paymentMethods: 3
  },
  '/api/addresses/1': {
    defaultAddress: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    totalAddresses: 2
  },
  '/api/settings/1': {
    notifications: 'Enabled',
    newsletter: 'Subscribed',
    language: 'English',
    timezone: 'EST',
    twoFactorAuth: 'Enabled'
  }
};

// Track which cards are expanded
expanded: { [id: number]: boolean } = {};

async onCardChange(card: Card, expanded: boolean) {
  this.expanded[card.id] = expanded;
  if (expanded && !this.loadedContent[card.id]) {
    await this.loadDynamicContent(card.id, card.endpoint);
  }
}

async loadDynamicContent(cardId: number, endpoint: string) {
  this.loadingStates[cardId] = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    const data = this.mockData[endpoint] || { message: 'No data available' };
    this.loadedContent[cardId] = data;
  } catch (error) {
    this.loadedContent[cardId] = { error: 'Failed to load content' };
  } finally {
    this.loadingStates[cardId] = false;
  }
}

objectKeys = Object.keys;
}

```

```html
<div class="cards-list">
<h2>Account Information</h2>
<p style="margin-bottom: 24px; color: #666;">
  Click on any card to load its content dynamically. Images and data are only loaded when needed.
</p>

<div class="cards-grid">
</div>
</div>

```

### Vue 3

```vue
<script setup lang="ts">
import { WppExpandableCard } from '@wppopen/components-library-vue'
import { ref, reactive } from 'vue'

// Define types
interface DynamicContent {
  [key: string]: any
  error?: string
}

interface LoadedContentState {
  [key: number]: DynamicContent
}

interface LoadingState {
  [key: number]: boolean
}

interface Card {
  id: number
  title: string
  endpoint: string
  imageUrl: string
  imageAlt: string
}

// State management
const loadedContent = reactive<LoadedContentState>({})
const loadingStates = reactive<LoadingState>({})

// Sample data - could come from API
const cards = ref<Card[]>([
  {
    id: 1,
    title: 'User Profile Details',
    endpoint: '/api/users/1',
    imageUrl: 'https://placehold.co/400x200?text=User+Profile',
    imageAlt: 'User Profile',
  },
  {
    id: 2,
    title: 'Order History',
    endpoint: '/api/orders/1',
    imageUrl: 'https://placehold.co/400x200?text=Order+History',
    imageAlt: 'Order History',
  },
  {
    id: 3,
    title: 'Payment Methods',
    endpoint: '/api/payments/1',
    imageUrl: 'https://placehold.co/400x200?text=Payment+Methods',
    imageAlt: 'Payment Methods',
  },
  {
    id: 4,
    title: 'Shipping Addresses',
    endpoint: '/api/addresses/1',
    imageUrl: 'https://placehold.co/400x200?text=Shipping+Addresses',
    imageAlt: 'Shipping Addresses',
  },
  {
    id: 5,
    title: 'Preferences & Settings',
    endpoint: '/api/settings/1',
    imageUrl: 'https://placehold.co/400x200?text=Preferences',
    imageAlt: 'Preferences & Settings',
  },
])

// Mock different data for each endpoint
const mockData: { [key: string]: any } = {
  '/api/users/1': {
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: '2020-01-15',
    subscription: 'Premium',
    lastLogin: '2023-08-06',
  },
  '/api/orders/1': {
    totalOrders: 24,
    lastOrder: '2023-07-28',
    totalSpent: '$1,234.56',
    averageOrderValue: '$51.44',
    favoriteCategory: 'Electronics',
  },
  '/api/payments/1': {
    defaultCard: '**** **** **** 1234',
    cardType: 'Visa',
    expiryDate: '12/25',
    billingAddress: '123 Main St, City, ST 12345',
    paymentMethods: 3,
  },
  '/api/addresses/1': {
    defaultAddress: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    totalAddresses: 2,
  },
  '/api/settings/1': {
    notifications: 'Enabled',
    newsletter: 'Subscribed',
    language: 'English',
    timezone: 'EST',
    twoFactorAuth: 'Enabled',
  },
}

const loadDynamicContent = async (cardId: number, endpoint: string) => {
  loadingStates[cardId] = true

  try {
    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay

    const data = mockData[endpoint] || { message: 'No data available' }

    loadedContent[cardId] = data
  } catch (error) {
    loadedContent[cardId] = { error: 'Failed to load content' }
  } finally {
    loadingStates[cardId] = false
  }
}

const handleCardChange = async (cardId: number, endpoint: string, event: any) => {
  console.log('wppChange event:', event)
  if (event.detail && event.detail.expanded && !loadedContent[cardId]) {
    await loadDynamicContent(cardId, endpoint)
  }
}
</script>

<template>
  <div class="cards-list">
    <h2>Account Information</h2>
    <p :style="{ marginBottom: '24px', color: '#666' }">
      Click on any card to load its content dynamically. Images and data are only loaded when needed.
    </p>

    <WppExpandableCard
      v-for="card in cards"
      :key="card.id"
      :header="card.title"
      size="l"
      @wppChange="(event: any) => handleCardChange(card.id, card.endpoint, event)"
      :style="{ marginBottom: '16px' }"
    >
      <!-- Show loading state -->
      <div v-if="loadingStates[card.id]" :style="{ padding: '20px', textAlign: 'center' }">
        <div class="loading-spinner">Loading content...</div>
      </div>

      <!-- Show loaded content with image -->
      <div
        v-else-if="loadedContent[card.id] && !loadingStates[card.id]"
        class="dynamic-content"
        :style="{ padding: '16px' }"
      >
        <!-- Display image first -->
        <div v-if="card.imageUrl" :style="{ marginBottom: '16px' }">
          <img :src="card.imageUrl" :alt="card.imageAlt" :style="{ width: '100%', borderRadius: '8px' }" />
        </div>

        <!-- Display content or error -->
        <div v-if="loadedContent[card.id].error" :style="{ color: 'red', padding: '16px', textAlign: 'center' }">
          <p>{{ loadedContent[card.id].error }}</p>
        </div>
        <div
          v-else
          :style="{
            backgroundColor: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
          }"
        >
          <h3 :style="{ marginBottom: '12px' }">Loaded Data:</h3>
          <div>
            <div v-for="(value, key) in loadedContent[card.id]" :key="key" class="content-item">
              <strong>{{ key }}:</strong> {{ JSON.stringify(value) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Show placeholder when not expanded yet -->
      <div
        v-else
        :style="{
          padding: '40px',
          textAlign: 'center',
          color: '#999',
          backgroundColor: '#fafafa',
          borderRadius: '8px',
        }"
      >
        <p>Click to expand and load content</p>
      </div>
    </WppExpandableCard>
  </div>
</template>

<style scoped>
.cards-list {
  /* Add any custom styles here */
}

.content-item {
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
}

.content-item:last-child {
  border-bottom: none;
}

.loading-spinner {
  /* Add loading spinner styles if needed */
}

.dynamic-content {
  /* Add dynamic content styles if needed */
}
</style>

```

## Performance Tips

1. **Group Heavy Components**: Place all heavy components inside a single wrapper to minimize re-renders
2. **Use Memoization**: In React, wrap heavy components with `React.memo()`
3. **Lazy Load Images**: Combine with image lazy loading for maximum benefit
4. **Consider Virtual Scrolling**: For very long lists inside cards

## Testing Lazy Loading

To verify lazy loading is working:

1. Open browser DevTools
2. Check Network tab or add console logs to your components
3. Verify components only load when cards are expanded
4. Monitor performance metrics
