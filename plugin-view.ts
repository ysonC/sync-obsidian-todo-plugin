import { ItemView, WorkspaceLeaf } from "obsidian";
import type TaskSyncerPlugin from "./main";

export const VIEW_TYPE_TODO_SIDEBAR = "tasks-syncer-sidebar";

export class TaskSidebarView extends ItemView {
	plugin: TaskSyncerPlugin;

	constructor(leaf: WorkspaceLeaf, plugin: TaskSyncerPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType(): string {
		return VIEW_TYPE_TODO_SIDEBAR;
	}

	getDisplayText(): string {
		return "To-Do Tasks";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();

		container.createEl("h3", { text: "Tasks" });

		const tasks = await this.plugin.getTasksFromSelectedList();
		console.log(tasks);
		if (tasks.size === 0) {
			container.createEl("p", { text: "No tasks found or not authenticated." });
			return;
		}

		tasks.forEach((value, title) => {
			const line = container.createEl("div", { cls: "task-line" });
			// line.createEl("input", { attr: { type: "checkbox" } });
			const checkbox = line.createEl("input", {
				type: "checkbox"
			}) as HTMLInputElement;
			
			checkbox.checked = value === "completed";
			checkbox.disabled = true;

			line.createEl("span", {
				text: ` ${title}`,
			});
		});
	}

	async onClose() {
		// Optional cleanup
	}
}

