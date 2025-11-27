import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { StoresService } from './stores/stores.service';
import { ProductsService } from './products/products.service';
import { StoreProductsService } from './store-products/store-products.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const usersService = app.get(UsersService);
    const storesService = app.get(StoresService);
    const productsService = app.get(ProductsService);
    const storeProductsService = app.get(StoreProductsService);

    console.log('🌱 Seeding data...');

    // 1. Create Demo User
    const email = 'demo@choppi.app';
    const existingUser = await usersService.findOneByEmail(email);
    if (!existingUser) {
        await usersService.create({
            email,
            password: 'password123',
            name: 'Demo User',
        });
        console.log('✅ User created: demo@choppi.app / password123');
    } else {
        console.log('ℹ️ User already exists');
    }

    // 2. Define Stores Data
    // 2. Define Stores Data
    const storesData = [
        { name: 'Luvebras', address: 'Av. Sucre, Los Dos Caminos', image: '/stores/luvebras.jpeg' },
        { name: 'Supermercado Santa Rosa', address: 'Santa Paula, Caracas', image: '/stores/santa rosa.png' },
        { name: '2doce Market', address: 'Av. Principal de Las Mercedes', image: '/stores/2docemarket.png' },
        { name: 'Farmatodo', address: 'Los Palos Grandes', image: '/stores/farmatodo.jpg' },
        { name: 'Licorería Prolicor', address: 'Chacao, Calle Mohedano', image: '/stores/prolicor.png' },
        { name: 'Forum', address: 'Centro Comercial, Caracas', image: '/stores/forum.png' },
    ];

    const createdStores: Record<string, any> = {};

    // Handle renaming old stores
    const oldCentralStore = await storesService.findOneBy({ name: 'Mercato Market' });
    if (oldCentralStore) {
        console.log('🔄 Renaming Mercato Market to Supermercado Santa Rosa...');
        await storesService.update(oldCentralStore.id, { name: 'Supermercado Santa Rosa', image: '/stores/santa rosa.png' });
    }
    const oldMadeStore = await storesService.findOneBy({ name: 'Central Madeirense' });
    if (oldMadeStore) {
        console.log('🔄 Renaming Central Madeirense to Supermercado Santa Rosa...');
        await storesService.update(oldMadeStore.id, { name: 'Supermercado Santa Rosa', image: '/stores/santa rosa.png' });
    }
    // Rename previous Forum (which was Central) to Santa Rosa if it exists from previous run
    const oldForumStore = await storesService.findOneBy({ name: 'Forum' });
    // Check if this is the "Santa Paula" one (old Central) or the "Centro Comercial" one (old Farmarket)
    // Actually, simpler logic: 
    // If we have a store named 'Forum' at 'Santa Paula', it should be 'Supermercado Santa Rosa'
    // If we have a store named 'Farmarket', it should be 'Forum'

    if (oldForumStore && oldForumStore.address.includes('Santa Paula')) {
        console.log('🔄 Renaming Forum (Santa Paula) to Supermercado Santa Rosa...');
        await storesService.update(oldForumStore.id, { name: 'Supermercado Santa Rosa', image: '/stores/santa rosa.png' });
    }

    const oldFarmarketStore = await storesService.findOneBy({ name: 'Farmarket' });
    if (oldFarmarketStore) {
        console.log('🔄 Renaming Farmarket to Forum...');
        await storesService.update(oldFarmarketStore.id, { name: 'Forum', image: '/stores/forum.png' });
    }

    for (const storeData of storesData) {
        let store = await storesService.findOneBy({ name: storeData.name });
        if (!store) {
            store = await storesService.create(storeData);
            console.log(`✅ Store created: ${store.name}`);
        } else {
            // Update image if it exists but has no image or different image
            if (store.image !== storeData.image) {
                await storesService.update(store.id, { image: storeData.image });
                store.image = storeData.image;
                console.log(`🔄 Store updated (image): ${store.name}`);
            } else {
                console.log(`ℹ️ Store already exists: ${store.name}`);
            }
        }
        createdStores[store.name] = store;
    }

    // Add legacy stores if they exist (so we can assign products to them)
    const tiendaDeBarrio = await storesService.findOneBy({ name: 'Tienda de Barrio' });
    if (tiendaDeBarrio) {
        createdStores['Tienda de Barrio'] = tiendaDeBarrio;
    }
    const supermercadoCentral = await storesService.findOneBy({ name: 'Supermercado Central' });
    if (supermercadoCentral) {
        createdStores['Supermercado Central'] = supermercadoCentral;
    }


    // 3. Define Products Data (Global Catalog)
    const productsCatalog = [
        // Charcutería (Luvebras focus)
        // Charcutería (Luvebras focus)
        { name: 'Jamón Plumrose Superior', sku: 'JAM-PLU-001', description: 'Jamón cocido superior, precio por kg', image: '/products/jamon.png' },
        { name: 'Queso Amarillo Torondoy', sku: 'QUE-TOR-001', description: 'Queso amarillo tipo Gouda, precio por kg', image: '/products/quesoamarrillo.png' },
        { name: 'Salchichón Oscar Mayer', sku: 'SAL-OSC-001', description: 'Salchichón tipo Cervezero', image: '/products/salchichon.jpg' },
        { name: 'Chorizo Ahumado', sku: 'CHO-AHU-001', description: 'Chorizo ahumado parrillero', image: '/products/chorizoahumado.jpg' },
        { name: 'Pechuga de Pavo', sku: 'PEC-PAV-001', description: 'Pechuga de pavo cocida', image: '/products/pechugadepavo.jpg' },

        // Carnicería (Mercato focus)
        { name: 'Solomo de Cuerito', sku: 'CAR-SOL-001', description: 'Corte de carne de res de primera', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Punta Trasera', sku: 'CAR-PUN-001', description: 'Ideal para parrillas', image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Carne Molida Premium', sku: 'CAR-MOL-001', description: 'Carne de res molida sin grasa', image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Chuleta de Cerdo', sku: 'CER-CHU-001', description: 'Chuleta ahumada de cerdo', image: 'https://images.unsplash.com/photo-1615937691194-97dbd3f3dc29?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Pollo Entero', sku: 'POL-ENT-001', description: 'Pollo entero beneficiado', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=1000&auto=format&fit=crop' },

        // Snacks (2doce focus)
        { name: 'Pringles Original', sku: 'SNK-PRI-001', description: 'Papas fritas Pringles 124g', image: '/products/pringles.jpg' },
        { name: 'Doritos Mega Queso', sku: 'SNK-DOR-001', description: 'Tortillas de maíz sabor a queso', image: '/products/doritos.jpg' },
        { name: 'Oreo Paquete', sku: 'SNK-ORE-001', description: 'Galletas Oreo paquete familiar', image: '/products/oreo.png' },
        { name: 'Chocolate Savoy Milk', sku: 'SNK-SAV-001', description: 'Chocolate con leche venezolano', image: '/products/chocolate.png' },
        { name: 'Pepito', sku: 'SNK-PEP-001', description: 'Snack de queso horneado', image: '/products/pepito.jpg' },
        { name: 'Ruffles Original', sku: 'SNK-RUF-001', description: 'Papas fritas onduladas', image: '/products/ruffles.jpg' },
        { name: 'Cheetos', sku: 'SNK-CHE-001', description: 'Snack de queso crocante', image: '/products/cheetos.jpeg' },
        { name: 'Toddy', sku: 'SNK-TOD-001', description: 'Bebida achocolatada 400g', image: '/products/toddy.png' },

        // Cuidado Personal (Farmatodo focus)
        { name: 'Shampoo Pantene', sku: 'CUI-PAN-001', description: 'Shampoo Restauración 400ml', image: '/products/pantene.jpg' },
        { name: 'Jabón Dove', sku: 'CUI-DOV-001', description: 'Barra de belleza original', image: '/products/jabon.jpg' },
        { name: 'Crema Dental Colgate', sku: 'CUI-COL-001', description: 'Protección anticaries', image: '/products/cremadental.jpg' },
        { name: 'Desodorante Rexona', sku: 'CUI-REX-001', description: 'Aerosol Men 150ml', image: '/products/desodorante.jpg' },
        { name: 'Protector Solar', sku: 'CUI-SOL-001', description: 'FPS 50+ toque seco', image: '/products/protector.png' },

        // Licores (Prolicor focus)
        { name: 'Ron Santa Teresa 1796', sku: 'LIC-SAN-001', description: 'Ron Añejo Solera', image: '/products/ronsantateresa.jpg' },
        { name: 'Ron Diplomático Reserva', sku: 'LIC-DIP-001', description: 'Reserva Exclusiva', image: '/products/diplomaticoron.jpg' },
        { name: 'Whisky Buchanans 12', sku: 'LIC-BUC-001', description: 'Deluxe 12 Años', image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Cerveza Polar Pilsen', sku: 'LIC-POL-001', description: 'Cerveza nacional, six pack', image: '/products/cerveza.jpg' },
        { name: 'Vino Tinto Gato Negro', sku: 'LIC-GAT-001', description: 'Cabernet Sauvignon', image: '/products/vino.png' },
        { name: 'Pepsi Light', sku: 'LIC-PEP-001', description: 'Refresco de cola sin azúcar', image: '/products/pepsilight.jpg' },
        { name: 'Pepsi Regular', sku: 'LIC-PEP-002', description: 'Refresco de cola original', image: '/products/pepsinormal.jpg' },
        { name: 'Gatorade Fruit Punch', sku: 'LIC-GAT-003', description: 'Bebida isotónica sabor frutas', image: '/products/gatorade.jpg' },

        // Básicos (General)
        { name: 'Harina P.A.N.', sku: 'BAS-PAN-001', description: 'Harina de maíz precocida', image: '/products/harina.jpg' },
        { name: 'Arroz Mary', sku: 'BAS-ARR-001', description: 'Arroz blanco de mesa', image: '/products/arroz.png' },
        { name: 'Pasta Primor', sku: 'BAS-PAS-001', description: 'Espagueti largo 1kg', image: '/products/pasta.png' },
        { name: 'Aceite Mazeite', sku: 'BAS-ACE-001', description: 'Aceite de maíz 1L', image: '/products/mazeite.jpg' },
        { name: 'Café Páramo', sku: 'BAS-CAF-001', description: 'Café molido 500g', image: '/products/cafe.jpg' },
        { name: 'Avena Quaker', sku: 'BAS-AVE-001', description: 'Avena en hojuelas', image: '/products/avena.png' },

        // Pet Food (Santa Rosa focus)
        { name: 'Dog Chow Adultos', sku: 'MAS-DOG-001', description: 'Alimento para perros adultos 2kg', image: '/products/dogchow.jpg' },
        { name: 'Gatarina Whiskas', sku: 'MAS-WHI-001', description: 'Alimento para gatos sabor pescado 1.5kg', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Perrarina Super Can', sku: 'MAS-SUP-001', description: 'Alimento balanceado económico 4kg', image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Snack para Perros', sku: 'MAS-SNK-001', description: 'Galletas en forma de hueso', image: 'https://images.unsplash.com/photo-1582798358481-d199fb7347bb?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Arena para Gatos', sku: 'MAS-ARE-001', description: 'Arena sanitaria aglomerante 5kg', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Alpiste para Aves', sku: 'MAS-ALP-001', description: 'Mezcla de semillas 500g', image: '/products/alpiste.webp' },
        { name: 'Hueso de Carnaza', sku: 'MAS-HUE-001', description: 'Juguete comestible para perros', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Comida Húmeda Gatos', sku: 'MAS-HUM-001', description: 'Lata de atún para gatos 156g', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Shampoo para Mascotas', sku: 'MAS-SHA-001', description: 'Shampoo antipulgas 300ml', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Collar Antipulgas', sku: 'MAS-COL-001', description: 'Collar protector duración 3 meses', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1000&auto=format&fit=crop' },

        // Canned Goods (Forum focus)
        { name: 'Atún Margarita', sku: 'ENL-ATU-001', description: 'Lomo de atún en aceite 170g', image: '/products/atun.jpg' },
        { name: 'Maíz Dulce', sku: 'ENL-MAI-001', description: 'Granos de maíz dulce 250g', image: '/products/maiz.jpg' },
        { name: 'Guisantes Verdes', sku: 'ENL-GUI-001', description: 'Guisantes tiernos en lata', image: '/products/guisantes.jpg' },
        { name: 'Sardinas en Tomate', sku: 'ENL-SAR-001', description: 'Sardinas en salsa de tomate 170g', image: '/products/sardinas.jpg' },
        { name: 'Aceitunas Rellenas', sku: 'ENL-ACE-001', description: 'Aceitunas verdes rellenas de pimiento', image: '/products/aceitunas.jpg' },
        { name: 'Diablitos Underwood', sku: 'ENL-DIA-001', description: 'Jamón endiablado original', image: '/products/diablitos.jpg' },
        { name: 'Caraotas Negras', sku: 'ENL-CAR-001', description: 'Caraotas negras listas para comer', image: '/products/caraotas.jpg' },
        { name: 'Champiñones Laminados', sku: 'ENL-CHA-001', description: 'Champiñones en salmuera', image: '/products/champinones.jpg' },
        { name: 'Melocotones en Almíbar', sku: 'ENL-MEL-001', description: 'Mitades de melocotón 820g', image: '/products/melocoton.jpg' },
        { name: 'Leche Condensada', sku: 'ENL-LEC-001', description: 'Leche condensada azucarada', image: '/products/lechecondensada.jpg' },
        { name: 'Salsa de Tomate', sku: 'ENL-SAL-001', description: 'Salsa de tomate ketchup 397g', image: '/products/salsadetomate.jpg' },
    ];

    const createdProducts: Record<string, any> = {};

    for (const prodData of productsCatalog) {
        try {
            const product = await productsService.create(prodData);
            createdProducts[product.sku] = product;
            console.log(`✅ Product created: ${product.name}`);
        } catch (e) {
            // If product exists, update it (to apply new images)
            // Assuming findOneBySku is not available, use findOneBy if it exists or fallback
            // Actually, let's use the repository directly or a known method.
            // Since we don't have findOneBySku, let's try to find it from the allProducts list later?
            // No, we need it now. Let's assume findOneBy exists on the service if it extends a base service, 
            // or we can just fetch all and map.
            // But wait, we can just use the service.findAll() which is already used below?
            // No, that's after.
            // Let's try to use `findOne` if it accepts criteria, or just skip and rely on the update below.
            // Better: let's just use the `productsService` methods we saw. 
            // We saw `update`. We didn't see `findOneBySku`.
            // Let's look at the service file.

            // Temporary fix: just log for now until we see the service file.
            // Actually, I will read the service file in the next step.
            // For now, let's revert to a safe state or try to use a method that likely exists.
            // The error said `findOneBySku` does not exist.

            // Let's try to find by ID if we can? No we don't have ID.
            // Let's just catch and continue, and then update ALL products after the loop.
            console.log(`ℹ️ Product ${prodData.sku} already exists, will update later`);
        }
    }

    // Refresh products map from DB
    const allProducts = await productsService.findAll();
    const productMap = new Map(allProducts.map(p => [p.sku, p]));

    // Update all products with new data (names, descriptions, images)
    for (const prodData of productsCatalog) {
        const existingProduct = productMap.get(prodData.sku);
        if (existingProduct) {
            const needsUpdate =
                existingProduct.name !== prodData.name ||
                existingProduct.description !== prodData.description ||
                existingProduct.image !== prodData.image;

            if (needsUpdate) {
                await productsService.update(existingProduct.id, {
                    name: prodData.name,
                    description: prodData.description,
                    image: prodData.image
                });
                console.log(`🔄 Product updated: ${prodData.name}`);
            }
        }
    }

    // 4. Assign Products to Stores (Inventory)
    const assignProduct = async (storeName: string, skus: string[], priceMultiplier: number = 1) => {
        const store = createdStores[storeName];
        if (!store) return;

        for (const sku of skus) {
            const product = productMap.get(sku);
            if (!product) continue;

            const basePrices: Record<string, number> = {
                'JAM-PLU-001': 12.50, 'QUE-TOR-001': 9.80, 'SAL-OSC-001': 8.50, 'CHO-AHU-001': 7.20, 'PEC-PAV-001': 11.00,
                'CAR-SOL-001': 8.90, 'CAR-PUN-001': 14.50, 'CAR-MOL-001': 6.50, 'CER-CHU-001': 7.80, 'POL-ENT-001': 3.50,
                'SNK-PRI-001': 3.50, 'SNK-DOR-001': 2.80, 'SNK-ORE-001': 4.20, 'SNK-SAV-001': 1.50, 'SNK-PEP-001': 1.20,
                'SNK-RUF-001': 3.80, 'SNK-CHE-001': 2.50, 'SNK-TOD-001': 5.50,
                'CUI-PAN-001': 6.50, 'CUI-DOV-001': 1.80, 'CUI-COL-001': 2.50, 'CUI-REX-001': 3.20, 'CUI-SOL-001': 12.00,
                'LIC-SAN-001': 45.00, 'LIC-DIP-001': 38.00, 'LIC-BUC-001': 32.00, 'LIC-POL-001': 5.00, 'LIC-GAT-001': 8.50,
                'LIC-PEP-001': 1.50, 'LIC-PEP-002': 1.50, 'LIC-GAT-002': 2.00,
                'BAS-PAN-001': 1.10, 'BAS-ARR-001': 1.20, 'BAS-PAS-001': 1.50, 'BAS-ACE-001': 3.50, 'BAS-CAF-001': 7.00,
                'BAS-AVE-001': 3.20,
                // Pet Food
                'MAS-DOG-001': 12.50, 'MAS-WHI-001': 9.80, 'MAS-SUP-001': 15.00, 'MAS-SNK-001': 4.50, 'MAS-ARE-001': 8.20,
                'MAS-ALP-001': 2.50, 'MAS-HUE-001': 3.00, 'MAS-HUM-001': 1.80, 'MAS-SHA-001': 6.50, 'MAS-COL-001': 12.00,
                // Canned Goods
                'ENL-ATU-001': 2.20, 'ENL-MAI-001': 1.50, 'ENL-GUI-001': 1.40, 'ENL-SAR-001': 1.10, 'ENL-DIA-001': 3.50,
                'ENL-CAR-001': 1.20, 'ENL-CHA-001': 2.80, 'ENL-MEL-001': 4.50, 'ENL-LEC-001': 2.50, 'ENL-SAL-001': 1.80,
                'ENL-ACE-001': 3.10
            };

            const basePrice = basePrices[sku] || 10.00;
            const finalPrice = +(basePrice * priceMultiplier).toFixed(2);
            const stock = Math.floor(Math.random() * 50) + 10;

            try {
                await storeProductsService.create(store.id, {
                    productId: product.id,
                    price: finalPrice,
                    stock: stock
                });
                console.log(`   -> Added ${product.name} to ${store.name} ($${finalPrice})`);
            } catch (e) {
                // Ignore duplicates
            }
        }
    };

    // Helper function to assign products with ZERO stock (out of stock)
    const assignProductOutOfStock = async (storeName: string, skus: string[], priceMultiplier: number = 1) => {
        const store = createdStores[storeName];
        if (!store) return;

        for (const sku of skus) {
            const product = productMap.get(sku);
            if (!product) continue;

            const basePrices: Record<string, number> = {
                'JAM-PLU-001': 12.50, 'QUE-TOR-001': 9.80, 'SAL-OSC-001': 8.50, 'CHO-AHU-001': 7.20, 'PEC-PAV-001': 11.00,
                'CAR-SOL-001': 8.90, 'CAR-PUN-001': 14.50, 'CAR-MOL-001': 6.50, 'CER-CHU-001': 7.80, 'POL-ENT-001': 3.50,
                'SNK-PRI-001': 3.50, 'SNK-DOR-001': 2.80, 'SNK-ORE-001': 4.20, 'SNK-SAV-001': 1.50, 'SNK-PEP-001': 1.20,
                'SNK-RUF-001': 3.80, 'SNK-CHE-001': 2.50, 'SNK-TOD-001': 5.50,
                'CUI-PAN-001': 6.50, 'CUI-DOV-001': 1.80, 'CUI-COL-001': 2.50, 'CUI-REX-001': 3.20, 'CUI-SOL-001': 12.00,
                'LIC-SAN-001': 45.00, 'LIC-DIP-001': 38.00, 'LIC-BUC-001': 32.00, 'LIC-POL-001': 5.00, 'LIC-GAT-001': 8.50,
                'LIC-PEP-001': 1.50, 'LIC-PEP-002': 1.50, 'LIC-GAT-002': 2.00,
                'BAS-PAN-001': 1.10, 'BAS-ARR-001': 1.20, 'BAS-PAS-001': 1.50, 'BAS-ACE-001': 3.50, 'BAS-CAF-001': 7.00,
                'BAS-AVE-001': 3.20,
                'MAS-DOG-001': 12.50, 'MAS-WHI-001': 9.80, 'MAS-SUP-001': 15.00, 'MAS-SNK-001': 4.50, 'MAS-ARE-001': 8.20,
                'MAS-ALP-001': 2.50, 'MAS-HUE-001': 3.00, 'MAS-HUM-001': 1.80, 'MAS-SHA-001': 6.50, 'MAS-COL-001': 12.00,
                'ENL-ATU-001': 2.20, 'ENL-MAI-001': 1.50, 'ENL-GUI-001': 1.40, 'ENL-SAR-001': 1.10, 'ENL-DIA-001': 3.50,
                'ENL-CAR-001': 1.20, 'ENL-CHA-001': 2.80, 'ENL-MEL-001': 4.50, 'ENL-LEC-001': 2.50, 'ENL-SAL-001': 1.80,
                'ENL-ACE-001': 3.10
            };

            const basePrice = basePrices[sku] || 10.00;
            const finalPrice = +(basePrice * priceMultiplier).toFixed(2);

            try {
                await storeProductsService.create(store.id, {
                    productId: product.id,
                    price: finalPrice,
                    stock: 0  // ZERO STOCK
                });
                console.log(`   -> Added ${product.name} to ${store.name} ($${finalPrice}, OUT OF STOCK)`);
            } catch (e) {
                // Ignore duplicates
            }
        }
    };

    // Assign specific catalogs
    await assignProduct('Luvebras', [
        'JAM-PLU-001', 'QUE-TOR-001', 'SAL-OSC-001', 'CHO-AHU-001', 'PEC-PAV-001',
        'BAS-PAN-001', 'BAS-ARR-001', 'BAS-PAS-001', 'SNK-SAV-001', 'SNK-PEP-001',
        'BAS-AVE-001', 'SNK-TOD-001'
    ], 1.05);

    await assignProduct('Supermercado Santa Rosa', [
        'MAS-DOG-001', 'MAS-WHI-001', 'MAS-SUP-001', 'MAS-SNK-001', 'MAS-ARE-001',
        'MAS-ALP-001', 'MAS-HUE-001', 'MAS-HUM-001', 'MAS-SHA-001', 'MAS-COL-001',
        'LIC-PEP-001', 'LIC-PEP-002', 'BAS-AVE-001'
    ], 1.10);

    await assignProduct('2doce Market', [
        'SNK-PRI-001', 'SNK-DOR-001', 'SNK-ORE-001', 'SNK-SAV-001', 'SNK-PEP-001',
        'SNK-RUF-001', 'SNK-CHE-001', 'SNK-TOD-001',
        'LIC-BUC-001', 'LIC-POL-001', 'BAS-PAN-001', 'CUI-DOV-001', 'CUI-COL-001'
    ], 1.15);

    await assignProduct('Farmatodo', [
        'CUI-PAN-001', 'CUI-DOV-001', 'CUI-COL-001', 'CUI-REX-001', 'CUI-SOL-001',
        'SNK-ORE-001', 'SNK-SAV-001', 'BAS-PAN-001', 'BAS-CAF-001', 'LIC-POL-001'
    ], 1.00);

    await assignProduct('Licorería Prolicor', [
        'LIC-SAN-001', 'LIC-DIP-001', 'LIC-BUC-001', 'LIC-POL-001', 'LIC-GAT-001',
        'LIC-PEP-001', 'LIC-PEP-002', 'LIC-GAT-002',
        'SNK-PRI-001', 'SNK-DOR-001', 'SNK-PEP-001', 'CAR-PUN-001', 'CHO-AHU-001'
    ], 0.95);

    await assignProduct('Forum', [
        'ENL-ATU-001', 'ENL-MAI-001', 'ENL-GUI-001', 'ENL-SAR-001', 'ENL-DIA-001',
        'ENL-CAR-001', 'ENL-CHA-001', 'ENL-MEL-001', 'ENL-LEC-001', 'ENL-SAL-001',
        'ENL-ACE-001'
    ], 1.05);

    // Tienda de Barrio - productos básicos sin stock
    await assignProductOutOfStock('Tienda de Barrio', [
        'BAS-PAN-001', 'BAS-ARR-001', 'BAS-PAS-001', 'BAS-ACE-001', 'BAS-CAF-001'
    ], 1.10);

    // Supermercado Central - variedad de productos sin stock
    await assignProductOutOfStock('Supermercado Central', [
        'BAS-PAN-001', 'BAS-ARR-001', 'SNK-ORE-001', 'SNK-SAV-001',
        'CUI-DOV-001', 'CUI-COL-001', 'BAS-CAF-001'
    ], 1.05);

    console.log('✅ Seeding finished successfully!');
    await app.close();
}
bootstrap();
