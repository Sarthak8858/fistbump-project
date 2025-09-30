const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const pickupService = {
  async schedulePickup(pickupData) {
    try {
      const response = await fetch(`${API_BASE_URL}/pickups/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...pickupData,
          user_id: 1,
          types: Array.isArray(pickupData.types) ? pickupData.types : [pickupData.types],
          special_instructions: pickupData.special_instructions || ''
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to schedule pickup');
      }
      
      return data;
    } catch (error) {
      console.error('Error scheduling pickup:', error);
      throw error;
    }
  },

  async getScheduledPickups() {
    try {
      const response = await fetch(`${API_BASE_URL}/pickups/`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to fetch pickups');
      }
      
      const data = await response.json();
      return data.map(pickup => ({
        ...pickup,
        types: Array.isArray(pickup.types) ? pickup.types : JSON.parse(pickup.types || '[]')
      }));
    } catch (error) {
      console.error('Error fetching pickups:', error);
      throw new Error(error.message || 'Failed to fetch pickups');
    }
  },

  async cancelPickup(pickupId) {
    try {
      const response = await fetch(`${API_BASE_URL}/pickups/${pickupId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to cancel pickup');
      return response.json();
    } catch (error) {
      console.error('Error canceling pickup:', error);
      throw error;
    }
  }
};
