import { PAGINATION_QUERY } from "../components/Pagination";

export default function paginationField() {
	return {
		keyArgs: false, //tells apollo we will take care of everything
		read(existing = [], { args, cache }) {
			// console.log({ existing, args, cache });
			const { skip, first } = args;
			//read the number of items on the page from the cache
			const data = cache.readQuery({ query: PAGINATION_QUERY });
			// console.log(data);
			const count = data?._allProductsMeta?.count;
			const page = skip / first + 1;
			const pages = Math.ceil(count / first);
			//check if we have existing items
			const items = existing.slice(skip, skip + first).filter((x) => x);

			//if there are items && there aren't enough items to satisfy how many requested && are on the last page
			if (items.length && items.length !== first && page === pages) {
				return items;
			}
			//check for non-existing items
			if (items.length !== first) {
				//we don't have items, must fetch from network
				return false;
			}
			//if there are items, return from cache, not network
			if (items.length) {
				console.log(
					`There are ${items.length} items in the cache ! Gonna send them to Apollo`
				);
				return items;
			}
			return false;

			//first thing apollo does is asks read function for items
			//We can either:
			//Return items that are already in cache
			//Return false from here (network request)
		},
		merge(existing, incoming, { args }) {
			const { skip, first } = args;
			// Merge function runs when apollo client comes back from network with products
			// console.log(`merging items from the network ${incoming.length}`);
			// console.log(incoming);
			const merged = existing ? existing.slice(0) : [];
			//line right below will not work without the following for loop (commented out)
			// merged.push(incoming)

			//slots in the blanks
			for (let i = skip; i < skip + incoming.length; ++i) {
				merged[i] = incoming[i - skip];
			}
			// console.log(merged);
			//Finally return
			return merged;
		},
	};
}
